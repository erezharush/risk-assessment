"use client";

import { BookOpen } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const REFERENCE_DATA = [
  {
    parameter: "סביבה",
    weight: "15%",
    values: [
      { label: "OT", score: 100 },
      { label: "IOT", score: 85 },
      { label: "IT", score: 75 },
      { label: "Internal Cloud", score: 75 },
      { label: "External Cloud", score: 40 },
    ],
  },
  {
    parameter: "חשיפה",
    weight: "15%",
    values: [
      { label: "חשיפה מלאה", score: 100 },
      { label: "חשיפה חלקית", score: 60 },
      { label: "ללא חשיפה", score: 40 },
    ],
  },
  {
    parameter: "מערכת",
    weight: "15%",
    values: [
      { label: "מערכת ראשית", score: 100 },
      { label: "מערכת משנית", score: 40 },
    ],
  },
  {
    parameter: "רמת סיווג",
    weight: "20%",
    values: [
      { label: "מידע בטחוני שמור אדום", score: 100 },
      { label: "מידע תשתיתי קריטי שמור צהוב", score: 90 },
      { label: "מידע תשתיתי חשמלי שמור צהוב", score: 80 },
      { label: "מידע אישי רגיש", score: 70 },
      { label: "מידע אישי מוגבל", score: 55 },
      { label: "מידע תשתיתי חשמלי שמור עסקי", score: 45 },
      { label: "מידע עסקי סודי", score: 35 },
      { label: "מידע עסקי שמור", score: 15 },
    ],
  },
  {
    parameter: "יעילות בקרה",
    weight: "15%",
    values: [
      { label: "1 חלשה", score: 100 },
      { label: "2", score: 80 },
      { label: "3", score: 60 },
      { label: "4", score: 40 },
      { label: "5 מצוינת", score: 20 },
    ],
  },
  {
    parameter: "הסתברות",
    weight: "20%",
    values: [
      { label: "1 נמוכה", score: 20 },
      { label: "2", score: 40 },
      { label: "3", score: 60 },
      { label: "4", score: 80 },
      { label: "5 גבוהה", score: 100 },
    ],
  },
];

const RISK_LEVELS = [
  { label: "גבוה מאוד", range: "≥90", color: "bg-red-600" },
  { label: "גבוה", range: "75-89.9", color: "bg-orange-500" },
  { label: "בינוני", range: "55-74.9", color: "bg-yellow-500" },
  { label: "נמוך", range: "35-54.9", color: "bg-green-500" },
  { label: "נמוך מאוד", range: "<35", color: "bg-blue-500" },
];

export function ReferenceModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="inline-flex items-center gap-2 rounded-md border bg-amber-50 border-amber-200 px-3 py-1.5 text-sm font-medium text-amber-800 hover:bg-amber-100 transition-colors">
          <BookOpen className="h-4 w-4" />
          מקרא ומשקלות
        </button>
      </DialogTrigger>
      <DialogContent dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-xl">מודל ציון סיכון - חברת החשמל</DialogTitle>
          <p className="text-sm text-muted-foreground mt-1">
            ציון 0-100 | ממוצע משוקלל | בקרה מפצה = הפחתה 20% | 5 רמות סיכון
          </p>
        </DialogHeader>

        <div className="mt-4 space-y-1">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-muted">
                <th className="border p-2 text-start font-semibold">פרמטר</th>
                <th className="border p-2 text-center font-semibold w-16">משקל</th>
                <th className="border p-2 text-start font-semibold">ערך</th>
                <th className="border p-2 text-center font-semibold w-16">ציון</th>
              </tr>
            </thead>
            <tbody>
              {REFERENCE_DATA.map((param) =>
                param.values.map((val, valIdx) => (
                  <tr key={`${param.parameter}-${valIdx}`} className="hover:bg-muted/50">
                    {valIdx === 0 ? (
                      <>
                        <td className="border p-2 font-medium bg-muted/30" rowSpan={param.values.length}>
                          {param.parameter}
                        </td>
                        <td className="border p-2 text-center bg-muted/30" rowSpan={param.values.length}>
                          {param.weight}
                        </td>
                      </>
                    ) : null}
                    <td className="border p-2">{val.label}</td>
                    <td className="border p-2 text-center font-mono">{val.score}</td>
                  </tr>
                )),
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold mb-2">רמות סיכון</h3>
          <div className="grid grid-cols-5 gap-2">
            {RISK_LEVELS.map((level) => (
              <div key={level.label} className="text-center">
                <div className={`${level.color} text-white rounded-md py-1 px-2 text-xs font-bold`}>
                  {level.label}
                </div>
                <div className="text-xs text-muted-foreground mt-1">{level.range}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 p-3 bg-blue-50 rounded-md text-sm text-blue-800">
          <strong>נוסחה:</strong> ציון גולמי = Σ(ציון פרמטר × משקל) | עם בקרה מפצה: ציון סופי = ציון גולמי × 0.80
        </div>
      </DialogContent>
    </Dialog>
  );
}
