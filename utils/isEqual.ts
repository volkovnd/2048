export const isEqual = <T>(input1: T, input2: any): boolean => {
  if (Array.isArray(input1) && Array.isArray(input2)) {
    return input1.every((item, index) => {
      return isEqual(item, input2[index]);
    });
  } else if (
    typeof input1 === "object" &&
    typeof input2 === "object" &&
    input1 !== null &&
    input2 !== null
  ) {
    return (Object.keys(input1) as Array<keyof T>).every(
      (key) => key in input2 && input1[key] === input2[key]
    );
  } else {
    return input1 === input2;
  }
};
