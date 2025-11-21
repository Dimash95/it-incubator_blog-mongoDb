import express, { Request, Response } from "express";
import { BlogModel } from "./model";
import { basicAuth } from "../../middlewares/auth";
import { createBlogValidation } from "./validation";
import { inputValidation } from "../../middlewares/input-validation";
import { HttpResponses } from "../../const";

export const blogsRouter = express.Router();

blogsRouter.get("/:id", async (req, res) => {
  const blog = await BlogModel.findById(req.params.id);

  if (!blog)
    return res
      .status(HttpResponses.NOT_FOUND)
      .send(`Blog with id ${req.params.id} doesn't exist!`);

  return res.status(HttpResponses.OK).send(blog);
});

blogsRouter.get("/", async (req, res) => {
  const blogs = await BlogModel.find();
  res.status(HttpResponses.OK).send(blogs);
});

blogsRouter.post(
  "/",
  basicAuth,
  createBlogValidation,
  inputValidation,
  async (req: Request, res: Response) => {
    const { name, description, websiteUrl } = req.body;

    const blog = await BlogModel.create({
      name,
      description,
      websiteUrl,
    });

    res.status(HttpResponses.CREATED).send(blog);
  }
);

blogsRouter.put(
  "/:id",
  basicAuth,
  createBlogValidation,
  inputValidation,
  async (req: Request, res: Response) => {
    const updated = await BlogModel.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
        websiteUrl: req.body.websiteUrl,
      },
      { new: true }
    );

    if (!updated)
      return res
        .status(HttpResponses.NOT_FOUND)
        .send(`Blog with id ${req.params.id} doesn't exist!`);

    return res.sendStatus(HttpResponses.NO_CONTENT);
  }
);

blogsRouter.delete("/:id", basicAuth, async (req: Request, res: Response) => {
  const deleted = await BlogModel.findByIdAndDelete(req.params.id);

  if (!deleted)
    return res
      .status(HttpResponses.NOT_FOUND)
      .send(`Blog with id ${req.params.id} doesn't exist!`);

  return res.sendStatus(HttpResponses.NO_CONTENT);
});
