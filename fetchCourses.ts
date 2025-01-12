import { google } from "googleapis";
import { z } from "zod";
import {
  CAREERS,
  DURATIONS,
  FUNDING_OPTIONS,
  HIGHLIGHTS,
  LANGUAGES,
  LOCATIONS,
  PROGRAM_TYPES,
} from "./src/courseValidation";
import fs from "fs-extra";

const labels = [
  "bootcampSlug",
  "description",
  "descriptionDE",
  "courseName",
  "courseNameDE",
  "location",
  "language",
  "duration",
  "durationTime",
  "durationTimeDE",
  "programType",
  "fundingOptions",
  "massnahmennummber",
  "price",
  "priceDE",
  "career",
  "requirements",
  "requirementsDE",
  "highlights",
  "courseSlug",
];

const sheet = z
  .tuple([
    z.string(), // bootcampSlug
    z.string(), // description
    z.string(), // descriptionDE
    z.string(), // courseName
    z.string(), // courseNameDE
    z
      .string()
      .transform((value) =>
        value
          .split(",")
          .map((value) => value.trim().toUpperCase())
          .flatMap((value) => value.split("\n"))
          .filter(Boolean)
      )
      .refine((val) =>
        val.reduce(
          (acc, cur) =>
            acc && LOCATIONS.map((language) => language.value).includes(cur),
          true
        )
      ), // location
    z
      .string()
      .transform((value) =>
        value
          .split(",")
          .map((value) => value.trim().toUpperCase())
          .flatMap((value) => value.split("\n"))
          .filter(Boolean)
      )
      .refine((val) =>
        val.reduce(
          (acc, cur) =>
            acc && LANGUAGES.map((language) => language.value).includes(cur),
          true
        )
      ), // language
    z
      .string()
      .refine((val) =>
        DURATIONS.map((duration) => duration.value).includes(val)
      ), // duration
    z.string(), // durationTime
    z.string(), // durationTimeDE
    z
      .string()
      .refine((val) =>
        PROGRAM_TYPES.map((programType) => programType.value).includes(val)
      ), // programType
    z
      .string()
      .transform((value) =>
        value
          .split(",")
          .map((value) => value.trim().toUpperCase())
          .flatMap((value) => value.split("\n"))
          .filter(Boolean)
      )
      .refine((val) =>
        val.reduce(
          (acc, cur) =>
            acc &&
            FUNDING_OPTIONS.map(
              (fundingOption) => fundingOption.value
            ).includes(cur),
          true
        )
      ), // fundingOptions
    z.string(), // massnahmennummber
    z.string(), // price
    z.string(), // priceDE
    z
      .string()
      .refine((val) => CAREERS.map((career) => career.value).includes(val)), // career
    z
      .string()
      .min(1)
      .transform((value) => value.split(",").map((value) => value.trim()))
      .or(z.literal("").transform((_) => [])), // requirements
    z
      .string()
      .min(1)
      .transform((value) => value.split(",").map((value) => value.trim()))
      .or(z.literal("").transform((_) => [])), // requirementsDE
    z
      .string()
      .transform((value) =>
        value
          .split(",")
          .map((value) => value.trim().toUpperCase())
          .flatMap((value) => value.split("\n"))
          .filter(Boolean)
      )
      .refine((val) =>
        val.reduce(
          (acc, cur) =>
            acc && HIGHLIGHTS.map((language) => language.value).includes(cur),
          true
        )
      )
      .or(z.literal("").transform(() => [])), // highlights
    z.string(), // courseSlug
  ])
  .array();

const fetchSheet = async () => {
  try {
    const API_KEY = "AIzaSyB-prc6EP0aR74HNyxgW-uTwrhfjKzyn2A";

    const sheets = google.sheets({
      version: "v4",
      auth: API_KEY,
    });
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: "1vnAbTbc4uNEUt0pCMhjEX5oQLCQqnTJq4uQtSEdybH8",
      // range: "A37:T37",
      range: "A3:T",
    });
    const validSheet = sheet.parse(res.data.values);
    const courses = validSheet.map((row) => ({
      bootcamp_slug: row[0],
      description: {
        en: row[1],
        de: row[2],
      },
      course_name: {
        en: row[3],
        de: row[4],
      },
      location: row[5],
      language: row[6],
      duration: row[7],
      duration_time: {
        en: row[8],
        de: row[9],
      },
      program_type: row[10],
      funding_options: row[11],
      massnahmennummber: row[12],
      price: {
        en: row[13],
        de: row[14],
      },
      career: row[15],
      requirements: {
        en: row[16],
        de: row[17],
      },
      highlights: row[18],
      course_slug: row[19],
    }));
    await fs.writeJSON("courses.json", courses);
  } catch (e) {
    console.error(e);
  }
};

fetchSheet();
