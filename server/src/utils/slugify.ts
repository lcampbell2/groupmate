import * as urlSlug from "url-slug";

export const slugify = (input: string) => {
  return urlSlug.convert(input, {
    separator: "-",
    transformer: urlSlug.LOWERCASE_TRANSFORMER,
  });
};
