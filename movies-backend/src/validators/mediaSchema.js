import { z } from 'zod';

export const createMediaschema =z.object({

title: z.string().min(1,"Title is required"),
type:z.enum(["Movie","Tv show"],{message:"Type must be either Movie or Tv show"}),
director:z.string().min(1,"Director name is required"),
budget:z.preprocess(
    (v)=>Number(v),
    z.number().positive("Budget must be a positive number")
),

location: z.string().min(1,"Location is required"),
duration: z.string().min(1,"Duration is required"),
year:z.preprocess(
    (V) => Number(V),
    z.number().int("Year must be an integer")
),
description:z.string().min(1,"Description is required"),
posterUrl: z.string().url("Invalid URL format"),

});

