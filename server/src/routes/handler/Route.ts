import { Router } from 'express';

abstract class Route {
  constructor(public path: string) {}

  abstract run(): Router;
}

export default Route;
