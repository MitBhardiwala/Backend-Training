import Worker from "./worker.js";
import Bonus from "./bonus.js";
import Department from "./department.js";

//worker belongs to department
Worker.belongsTo(Department);

//department belongs to many workers
Department.hasMany(Worker);

//workers can have many bonuses - worker has many bonuses
Worker.hasMany(Bonus)

//each bonus belonsgs to one worker;
Bonus.belongsTo(Worker)

export { Worker, Department, Bonus };
