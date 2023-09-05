import { Router, Request, Response } from 'express';

const router = Router();

type Course = {
  id: number,
  name: string,
  totalUnits: number,
  description: string
};

let courses: Course[] = [
  {
    id: 1,
    name: 'BSCS',
    totalUnits: 24,
    description:
      'Bachelor of Science in Computer Science (BSCS) is a four-year program that includes the study of computing concepts and theories, algorithmic foundations, and new developments in computing.',
  },
  {
    id: 2,
    name: 'BSIT',
    totalUnits: 29,
    description:
      'Information Technology is the study of utilization of both hardware and software technologies to provide computing solutions that address the needs of various users and organizations.',
  },
];



// read all
router.get('/', (req: Request, res: Response) => {
  res.send(courses);
});

// read specific by id
router.get('/:id', (req, res) => {
  const course = courses.find((x) => x.id == +req.params.id);
  if (!course) {
    return res.status(404).send();
  }
  res.send(course);
});

// create
router.post('/', (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send('body is empty');
  }

  if (req.body?.name?.length <= 0) {
    return res.status(400).send('name is required');
  }

  const course = {
    ...req.body,
    id: courses.length === 0 ? 1 : +courses[courses.length - 1].id + 1,
  };

  courses.push(course);

  res.status(200).send('' + course.id);
});

router.post('/', (req, res) => {
  const q = 'INSERT INTO courses (`name`, `totalUnits`, `description`) VALUES (?)';
  const values = [
    req.body.name,
    req.body.totalUnits,
    req.body.description,
  ];

  /* db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json('Course has been created successfully.');
  }); */
});

// update specific by id
router.put('/:id', (req, res) => {
  const course = courses.find((x) => x.id == +req.params.id);
  if (!course) {
    return res.status(404).send();
  }

  if (req.body?.name?.length <= 0) {
    return res.status(400).send('name is required');
  }
  if (req.body?.totalUnits?.length <= 0) {
    return res.status(400).send('totalUnits is required');
  }
  if (req.body?.description?.length <= 0) {
    return res.status(400).send('description is required');
  }

  course.name = req.body.name;
  course.totalUnits = req.body.totalUnits;
  course.description = req.body.description;

  res.send(course);
});

router.put('/:id', (req, res) => {
  const courseId = req.params.id;
  const q = 'UPDATE course set `name` = ?, `totalUnits`= ? `description`= ? WHERE id = ?';

  const values = [
    req.body.name,
    req.body.totalUnits,
    req.body.description,
  ]

  /* db.query(q, [...values, courseId], (err, data) => {
    if (err) return res.json(err);
    return res.json('Course has been updated successfully')
  }); */
});

// all
router.put('/', (req, res) => {
  res.send(courses);
});

// delete specific by id
router.delete('/:id', (req, res) => {
  const course = courses.find((x) => x.id == +req.params.id);
  if (!course) {
    return res.status(404).send();
  }

  courses = courses.filter((x) => x.id !=  +req.params.id);

  res.send();
});

export default router; 