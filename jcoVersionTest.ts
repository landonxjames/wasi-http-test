import { execa } from "execa";

console.log("RUNNING TESTS - jco");

const availableVersions = await execa("npm", [
  "view",
  "@bytecodealliance/jco",
  "--json",
]);

const availVersionsParsed = JSON.parse(availableVersions.stdout).versions;
//Note that we are starting at jco version 12 because that is the first one that
//supports wit resource types
const jcoVersionsToTest: string[] = availVersionsParsed.filter((ver) => {
  return ver.split(".")[1] >= 12;
});
console.log("TESTING JCO VERSIONS:", jcoVersionsToTest);

for (const ver of jcoVersionsToTest) {
  console.log(`Installing jco version: ${ver}`);
  await execa("npm", ["install", `@bytecodealliance/jco@${ver}`, "-D"]);

  console.log(`Building with version: ${ver}`);
  await execa("npm", ["run", "build"]);

  console.log(`Testing with version: ${ver}`);
  await execa("npm", ["run", "test"], {
    stdout: "inherit",
  });
}

console.log("TESTS SUCCESSFUL - jco");
