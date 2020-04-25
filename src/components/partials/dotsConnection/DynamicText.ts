const wrapperClass = {
  pre: "<span class='span-text'>",
  suf: "</span>",
};

const getkeyWord = (keyword: string) => {
  return `<span class='keyword'><span>${keyword}</span></span>`;
};

export const pairedTextSets = {
  chicken: {
    // correct. chicken is taken as food in modern society.
    // to process chicken into food, 4 steps are required.
    // and the journey begins now.
    first: `${wrapperClass.pre} correct. chicken is taken as food in modern society. ${wrapperClass.suf}`,
    second: `${wrapperClass.pre} to process ${getkeyWord(
      "chicken"
    )} into ${getkeyWord("food")}, 4 steps are required. ${wrapperClass.suf}`,
    third: `${wrapperClass.pre} and the journey begins now. ${wrapperClass.suf}`,
  },
  parrot: {
    // correct. parrot is commercialized as product in modern society.
    // to transform parrot into product, 3 steps are required.
    // and the journey begins now.
    first: `${wrapperClass.pre} correct. parrots are commercialized as products in modern society. ${wrapperClass.suf}`,
    second: `${wrapperClass.pre} to transform ${getkeyWord(
      "parrot"
    )} into ${getkeyWord("product")}, 3 steps are required. ${
      wrapperClass.suf
    }`,
    third: `${wrapperClass.pre} and the journey begins now. ${wrapperClass.suf}`,
  },
  sparrow: {
    // correct. sparrow is our neighbor in modern society.
    // there's no distance between sparrow and it's role.
    // here's my words to sparrow, my favorite neighbor.
    first: `${wrapperClass.pre} correct. sparrows are our neighbors in modern society. ${wrapperClass.suf}`,
    second: `${wrapperClass.pre} now, let's talk about our sparrow neighbors for a while. ${wrapperClass.suf}`,
  },
};

export const unpairedTextSets = {
  chickenText: {
    pet: "unfortunately for chicken, most people don't keep them as pet.",
    neighbor: "nope. i've never seen a chicken perching on the sidewalks.",
  },
  parrotText: {
    food: "luckily for parrot, we don't eat them. please don't tell me you do.",
    neighbor:
      "well, in some places like Canberra. but normally we don't see them as neighbor.",
  },
  sparrowText: {
    food: "well, people used to eat them, but not anymore in most places.",
    pet: "nope. pet stores don't sell them as pet.",
  },
};
