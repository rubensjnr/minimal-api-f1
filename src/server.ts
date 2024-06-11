import fastify from 'fastify';
import cors from '@fastify/cors'

const server = fastify({ logger: true });

server.register(cors, {
  origin: "*" 
});

const teams = [
  {
    "id": 1,
    "name": "McLaren",
    "base": "United Kingdom"
  },
  {
    "id": 2,
    "name": "Mercedes",
    "base": "United Kingdom"
  },
  {
    "id": 3,
    "name": "Red Bull Racing",
    "base": "Austria"
  },
  {
    "id": 4,
    "name": "Ferrari",
    "base": "Italy"
  },
  {
    "id": 5,
    "name": "Aston Martin",
    "base": "United Kingdom"
  },
  {
    "id": 6,
    "name": "Alpine",
    "base": "France"
  },
  {
    "id": 7,
    "name": "AlphaTauri",
    "base": "Italy"
  },
  {
    "id": 8,
    "name": "Alfa Romeo",
    "base": "Switzerland"
  },
  {
    "id": 9,
    "name": "Haas",
    "base": "United States"
  },
  {
    "id": 10,
    "name": "Williams",
    "base": "United Kingdom"
  }
];

const drivers = [
  {
    "id": 1,
    "name": "Max Verstappen",
    "team": "Red Bull Racing"
  },
  {
    "id": 2,
    "name": "Lewis Hamilton",
    "team": "Mercedes"
  },
  {
    "id": 3,
    "name": "Sergio Perez",
    "team": "Red Bull Racing"
  },
  {
    "id": 4,
    "name": "George Russell",
    "team": "Mercedes"
  },
  {
    "id": 5,
    "name": "Charles Leclerc",
    "team": "Ferrari"
  },
  {
    "id": 6,
    "name": "Carlos Sainz",
    "team": "Ferrari"
  },
  {
    "id": 7,
    "name": "Lando Norris",
    "team": "McLaren"
  },
  {
    "id": 8,
    "name": "Oscar Piastri",
    "team": "McLaren"
  },
  {
    "id": 9,
    "name": "Fernando Alonso",
    "team": "Aston Martin"
  },
  {
    "id": 10,
    "name": "Lance Stroll",
    "team": "Aston Martin"
  },
  {
    "id": 11,
    "name": "Esteban Ocon",
    "team": "Alpine"
  },
  {
    "id": 12,
    "name": "Pierre Gasly",
    "team": "Alpine"
  },
  {
    "id": 13,
    "name": "Yuki Tsunoda",
    "team": "AlphaTauri"
  },
  {
    "id": 14,
    "name": "Nyck de Vries",
    "team": "AlphaTauri"
  },
  {
    "id": 15,
    "name": "Valtteri Bottas",
    "team": "Alfa Romeo"
  },
  {
    "id": 16,
    "name": "Guanyu Zhou",
    "team": "Alfa Romeo"
  },
  {
    "id": 17,
    "name": "Kevin Magnussen",
    "team": "Haas"
  },
  {
    "id": 18,
    "name": "Nico Hülkenberg",
    "team": "Haas"
  },
  {
    "id": 19,
    "name": "Alex Albon",
    "team": "Williams"
  },
  {
    "id": 20,
    "name": "Logan Sargeant",
    "team": "Williams"
  }
];

server.get("/teams", async(request, response)=>{
  response.type("application/json").code(200);
  return teams;
});

server.get("/drivers", async(request, response)=>{
  response.type("application/json").code(200);
  return drivers;
});

interface DriverParams{
  id: string
}

server.get<{ Params: DriverParams }>("/drivers/:id", async(request, response)=>{
  const id = parseInt(request.params.id);
  const driver = drivers.find(d => d.id === id)

  if(!driver){
    response.type("application/json").code(404);
    return { message: "Driver Not Found!" }
  } else {
    response.type("application/json").code(200);
    return driver;
  }
});

interface TeamsParams{
  id: string
}

server.get<{ Params: TeamsParams }>("/teams/:id", async(request, response)=>{
  const id = +request.params.id;
  const team = teams.find( t => t.id === id);
  if(!team){
    response.type("application/json").code(404);
    return { message: "Team Not Found!" }
  } else {
    response.type("application/json").code(200);
    return team;
  }
});

server.listen({port: 3333}, ()=>{
  console.log("Servidor iniciado com sucesso!")
})