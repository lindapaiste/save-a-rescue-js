import he from "he";
import React from "react";

/**
 * clean up and print out description text
 */
export const Description = ({ text }: { text?: string }) => {
  if (!text) {
    return null;
  }
  // he.decode fixes &amp and other html encoded entities. still has &nbsp, browser can handle &nbsp, but creates
  // double paragraph spacing if the &nbsp is the only thing in a paragraph
  const clean = he.decode(text.replaceAll("&nbsp;", ""));

  // break on line breaks, removing empty from doubles or at start and end
  const paragraphs = clean.split("\n").filter((s) => s.length);

  return (
    <div className="description">
      {paragraphs.map((s) => (
        <p
          // Note: really not sure what the best key is here.
          key={s}
        >
          {s}
        </p>
      ))}
    </div>
  );
};
