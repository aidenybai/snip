import { Router } from 'express';

// Abstract class for Route
abstract class Route {
  constructor(public path: string) {}

  abstract run(): Router;
}

export default Route;
