import { merge, has, isArray, head, forEach, isObject } from "lodash-es";
import { Strapi4RequestParams } from "@nuxtjs/strapi/dist/runtime/types";

export const useChatHistory = (channel: string) =>
  useMessagesHistory({
    pagination: { limit: -1, start: 0 },
    filters: { type: { $eq: "CHAT" }, channel: { $eq: channel } },
  });

export const useMessagesHistory = (params: Strapi4RequestParams = {}) => {
  return useFind("messages", merge({ sort: ["datetime:asc"] }, params));
};

// Strapi request wrapper

export const useFind = (
  contentType: string,
  params?: Strapi4RequestParams,
  process = (data: any) => data
) => {
  const { find } = useStrapi4();
  // We create an unique cache key based on function arguments
  const key = JSON.stringify({ contentType, ...params });
  return useAsyncData(
    key,
    () =>
      find(contentType, params)
        .then((res) => parseStrapi(res))
        .then(process),
    { server: true }
  );
};

export const parseStrapi = (data: any): any => {
  if (has(data, "attributes")) {
    return parseStrapi(removeObjectKey(data, "attributes"));
  }

  if (isArray(data) && data.length && has(head(data), "attributes")) {
    return data.map((e) => parseStrapi(e));
  }

  forEach(data, (value, key) => {
    if (!value) {
      return;
    }

    if (isObject(value)) {
      data[key] = parseStrapi(value);
    }

    if (isArray(value)) {
      data[key] = value.map((field) => parseStrapi(field));
    }

    if (has(value, "data")) {
      let relation = null;
      if (isObject(value.data)) {
        relation = parseStrapi(value.data);
      }

      if (isArray(value.data)) {
        relation = value.data.map((e) => parseStrapi(e));
      }

      data[key] = relation;
    }

    if (has(value, "id")) {
      data[key] = parseStrapi(value);
    }

    if (isArray(value) && has(head(value), "id")) {
      data[key] = value.map((p) => parseStrapi(p));
    }

    if (has(value, "provider")) {
      return;
    }

    if (isArray(value) && has(head(value), "provider")) {
      return;
    }
  });

  return data.data ? data.data : data;
};

const removeObjectKey = (object, key) => ({
  id: object.id,
  ...object[key],
});
