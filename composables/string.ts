import { format } from "date-fns";

export const sentenceCase = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const replaceTokens = (str: string, obj: Record<string, string>) => {
  return str.replace(/\${(.*?)}/g, (_, v) => obj[v]);
};

export function randomString(length = 8): string {
  return [...Array(length)]
    .map(() => (~~(Math.random() * 36)).toString(36))
    .join("");
}

export const randomFilename = (ext) => {
  const date = format(new Date(), "dd-MM-yyyy-HH-mm-ss-SSS");
  return `${date}.${randomString(4)}.${ext}`;
};

export const split = (str = "", separator = ",") =>
  str
    .split(separator)
    .map((s) => s.trim())
    .filter((s) => s);

const replacer = () => {
  const seen = new WeakSet();
  return (_key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

export const stringify = (obj: object, _ = undefined, space = 2) =>
  JSON.stringify(obj, replacer(), space);

export const truncate = (str, length = 100) =>
  str.length <= length ? str : str.slice(0, length) + "...";
