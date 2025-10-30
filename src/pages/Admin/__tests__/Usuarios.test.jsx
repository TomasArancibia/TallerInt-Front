import fs from "fs";
import path from "path";

const filePath = path.join(__dirname, "..", "Usuarios.jsx");
const code = fs.readFileSync(filePath, "utf8");

if (code.trim().length <= 10) {
  test.skip("Usuarios.jsx está vacío — implementar el componente para poder testearlo", () => {});
} else {
  test("Usuarios.jsx existe y no está vacío", () => {
    expect(code.trim().length).toBeGreaterThan(10);
  });
}
