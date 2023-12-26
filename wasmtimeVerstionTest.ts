import { execa } from "execa";

console.log("RUNNING TESTS - wasmtimepy");

const wasmtimeVersionsRaw = await fetch("https://pypi.org/pypi/wasmtime/json");
const wasmtimeVersionsParsed = await wasmtimeVersionsRaw.json();
const wasmtimeVersionsToTest = Object.keys(
  wasmtimeVersionsParsed.releases
).filter((ver) => {
  return parseInt(ver.split(".")[0]) >= 12;
});
console.log(wasmtimeVersionsToTest);

for (const ver of wasmtimeVersionsToTest) {
  console.log(`Installing wasmtime version: ${ver}`);
  await execa("python3", ["-m", "pip", "install", `wasmtime==${ver}`]);

  console.log(`Building with version: ${ver}`);
  await execa("npm", ["run", "build-no-resources"]);

  console.log(`Testing with version: ${ver}`);
  await execa("npm", ["run", "test:py"], {
    stdout: "inherit",
  });
}
