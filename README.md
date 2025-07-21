# Income Equity & Affordability Analyzer

This web app helps users evaluate whether they are being fairly compensated based on their job, rent, location, and demographics. It visualizes wage gaps, rent burden, and living wage comparisons with an equity-focused lens.

---

## Live Demo  
[View Project (Coming Soon)]

---

## Purpose

Financial inequality is often invisible. This project aims to make wage disparities and affordability gaps visible through an interactive, data-driven experience. Users receive a personalized financial pressure score along with comparisons to national and demographic wage benchmarks.

---

## Features

- Input form for job title, income, rent, ZIP code, race, and gender
- Rent burden calculation
- Living wage comparison using public data
- Wage gap visualizer by race and gender
- Financial pressure scoring system
- Responsive, accessible design with light and dark mode support

---

## Tech Stack

- Frontend: React, Tailwind CSS, Chart.js
- Backend: Python, FastAPI
- Data Sources: MIT Living Wage Calculator, BLS job wage data, Pew Research
- Deployment: Vercel or Netlify (static client)
  

---

## Folder Structure

```plaintext
backend/
├── app/
│   ├── main.py          # Entry point for the FastAPI app
│   ├── routers/         # API route handlers (e.g., /analyze, /wage-gap)
│   ├── models/          # Pydantic models (request/response schemas)
│   ├── services/        # Core logic (calculations, comparisons, etc.)
│   └── data/            # Static data (CSVs, JSONs, etc.)
├── requirements.txt     # Python dependencies
└── README.md            # Project overview & setup instructions
```
