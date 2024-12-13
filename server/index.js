const e = require("express");
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a la base de datos empleados
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "290720mendoza*",
  database: "empleados"
});

// Conexión a la base de datos pacientes
const db2 = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "290720mendoza*",
  database: "pacientes"
});

// ===== CRUD PARA EMPLEADOS =====

// CREATE para doctores
app.post("/create", (req, res) => {
  const { dni, apellidoPaterno, apellidoMaterno, nombre, edad, diagnostico } = req.body;

  db.beginTransaction(err => {
    if (err) {
      console.log(err);
      res.status(500).send("Error al iniciar la transacción.");
      return;
    }

    db.query(
      'INSERT INTO empleados(dni, apellidoPaterno, apellidoMaterno, nombre, edad, diagnostico) VALUES (?, ?, ?, ?, ?, ?)',
      [dni, apellidoPaterno, apellidoMaterno, nombre, edad, diagnostico],
      (err, result) => {
        if (err) {
          return db.rollback(() => {
            console.log(err);
            res.status(500).send("Error al registrar en empleados.");
          });
        }

        db2.query(
          'INSERT INTO pacientes(nombre, apellidoPaterno, apellidoMaterno, dni, edad, correo, telefono) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [nombre, apellidoPaterno, apellidoMaterno, dni, edad, null, null],
          (err2, result2) => {
            if (err2) {
              return db.rollback(() => {
                console.log(err2);
                res.status(500).send("Error al sincronizar con pacientes.");
              });
            }

            db.commit(err => {
              if (err) {
                return db.rollback(() => {
                  console.log(err);
                  res.status(500).send("Error al completar la transacción.");
                });
              }

              res.send("Empleado y paciente registrados con éxito.");
            });
          }
        );
      }
    );
  });
});

// UPDATE para empleados
app.put("/update/:dni", (req, res) => {
  const dni = req.params.dni;
  const { apellidoPaterno, apellidoMaterno, nombre, edad, diagnostico } = req.body;

  db.beginTransaction(err => {
    if (err) {
      console.log(err);
      res.status(500).send("Error al iniciar la transacción.");
      return;
    }

    db.query(
      'UPDATE empleados SET apellidoPaterno = ?, apellidoMaterno = ?, nombre = ?, edad = ?, diagnostico = ? WHERE dni = ?',
      [apellidoPaterno, apellidoMaterno, nombre, edad, diagnostico, dni],
      (err, result) => {
        if (err) {
          return db.rollback(() => {
            console.log(err);
            res.status(500).send("Error al actualizar en empleados.");
          });
        }

        db2.query(
          'UPDATE pacientes SET nombre = ?, apellidoPaterno = ?, apellidoMaterno = ?, edad = ? WHERE dni = ?',
          [nombre, apellidoPaterno, apellidoMaterno, edad, dni],
          (err2, result2) => {
            if (err2) {
              return db.rollback(() => {
                console.log(err2);
                res.status(500).send("Error al sincronizar con pacientes.");
              });
            }

            db.commit(err => {
              if (err) {
                return db.rollback(() => {
                  console.log(err);
                  res.status(500).send("Error al completar la transacción.");
                });
              }

              res.send("Empleado y paciente actualizados con éxito.");
            });
          }
        );
      }
    );
  });
});

// DELETE para empleados
app.delete("/delete/:dni", (req, res) => {
  const dni = req.params.dni;

  db.beginTransaction(err => {
    if (err) {
      console.log(err);
      res.status(500).send("Error al iniciar la transacción.");
      return;
    }

    db.query('DELETE FROM empleados WHERE dni = ?', [dni], (err, result) => {
      if (err) {
        return db.rollback(() => {
          console.log(err);
          res.status(500).send("Error al eliminar en empleados.");
        });
      }

      db2.query('DELETE FROM pacientes WHERE dni = ?', [dni], (err2, result2) => {
        if (err2) {
          return db.rollback(() => {
            console.log(err2);
            res.status(500).send("Error al sincronizar eliminación con pacientes.");
          });
        }

        db.commit(err => {
          if (err) {
            return db.rollback(() => {
              console.log(err);
              res.status(500).send("Error al completar la transacción.");
            });
          }

          res.send("Empleado y paciente eliminados con éxito.");
        });
      });
    });
  });
});

// Búsqueda en la base de datos empleados
app.get("/patient/:dni", (req, res) => {
  const dni = req.params.dni;

  db.query("SELECT * FROM empleados WHERE dni = ?", [dni], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error al buscar el paciente en empleados.");
    } else if (result.length > 0) {
      res.send(result[0]); // Devuelve el primer registro encontrado
    } else {
      res.status(404).send("Paciente no encontrado en empleados.");
    }
  });
});

// ===== CRUD PARA PACIENTES =====

// CREATE para pacientes
app.post("/create2", (req, res) => {
  const { nombre, apellidoPaterno, apellidoMaterno, dni, edad, correo, telefono } = req.body;

  db2.beginTransaction(err => {
    if (err) {
      console.log(err);
      res.status(500).send("Error al iniciar la transacción.");
      return;
    }

    db2.query(
      'INSERT INTO pacientes(nombre, apellidoPaterno, apellidoMaterno, dni, edad, correo, telefono) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [nombre, apellidoPaterno, apellidoMaterno, dni, edad, correo, telefono],
      (err, result) => {
        if (err) {
          return db2.rollback(() => {
            console.log(err);
            res.status(500).send("Error al registrar en pacientes.");
          });
        }

        db.query(
          'INSERT INTO empleados(dni, apellidoPaterno, apellidoMaterno, nombre, edad, diagnostico) VALUES (?, ?, ?, ?, ?, ?)',
          [dni, apellidoPaterno, apellidoMaterno, nombre, edad, null],
          (err2, result2) => {
            if (err2) {
              return db2.rollback(() => {
                console.log(err2);
                res.status(500).send("Error al sincronizar con empleados.");
              });
            }

            db2.commit(err => {
              if (err) {
                return db2.rollback(() => {
                  console.log(err);
                  res.status(500).send("Error al completar la transacción.");
                });
              }

              res.send("Paciente y empleado registrados con éxito.");
            });
          }
        );
      }
    );
  });
});

// UPDATE para pacientes
app.put("/update2/:dni", (req, res) => {
  const dni = req.params.dni;
  const { nombre, apellidoPaterno, apellidoMaterno, edad, correo, telefono } = req.body;

  db2.beginTransaction(err => {
    if (err) {
      console.log(err);
      res.status(500).send("Error al iniciar la transacción.");
      return;
    }

    db2.query(
      'UPDATE pacientes SET nombre = ?, apellidoPaterno = ?, apellidoMaterno = ?, edad = ?, correo = ?, telefono = ? WHERE dni = ?',
      [nombre, apellidoPaterno, apellidoMaterno, edad, correo, telefono, dni],
      (err, result) => {
        if (err) {
          return db2.rollback(() => {
            console.log(err);
            res.status(500).send("Error al actualizar en pacientes.");
          });
        }

        db.query(
          'UPDATE empleados SET apellidoPaterno = ?, apellidoMaterno = ?, nombre = ?, edad = ? WHERE dni = ?',
          [apellidoPaterno, apellidoMaterno, nombre, edad, dni],
          (err2, result2) => {
            if (err2) {
              return db2.rollback(() => {
                console.log(err2);
                res.status(500).send("Error al sincronizar con empleados.");
              });
            }

            db2.commit(err => {
              if (err) {
                return db2.rollback(() => {
                  console.log(err);
                  res.status(500).send("Error al completar la transacción.");
                });
              }

              res.send("Paciente y empleado actualizados con éxito.");
            });
          }
        );
      }
    );
  });
});

// DELETE para pacientes
app.delete("/delete2/:dni", (req, res) => {
  const dni = req.params.dni;

  db2.beginTransaction(err => {
    if (err) {
      console.log(err);
      res.status(500).send("Error al iniciar la transacción.");
      return;
    }

    db2.query('DELETE FROM pacientes WHERE dni = ?', [dni], (err, result) => {
      if (err) {
        return db2.rollback(() => {
          console.log(err);
          res.status(500).send("Error al eliminar en pacientes.");
        });
      }

      db.query('DELETE FROM empleados WHERE dni = ?', [dni], (err2, result2) => {
        if (err2) {
          return db2.rollback(() => {
            console.log(err2);
            res.status(500).send("Error al sincronizar eliminación con empleados.");
          });
        }

        db2.commit(err => {
          if (err) {
            return db2.rollback(() => {
              console.log(err);
              res.status(500).send("Error al completar la transacción.");
            });
          }

          res.send("Paciente y empleado eliminados con éxito.");
        });
      });
    });
  });
});

// Búsqueda en la base de datos pacientes
app.get("/paciente/:dni", (req, res) => {
  const dni = req.params.dni;

  db2.query("SELECT * FROM pacientes WHERE dni = ?", [dni], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error al buscar el paciente en pacientes.");
    } else if (result.length > 0) {
      res.send(result[0]); // Devuelve el primer registro encontrado
    } else {
      res.status(404).send("Paciente no encontrado en pacientes.");
    }
  });
});

// ===== SERVIDOR =====
app.listen(3001, () => {
  console.log("Servidor corriendo en el puerto 3001");
});
