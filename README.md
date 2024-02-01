# Child Witness Centre ⚖

Welcome to the CWC platform repository!

## Stack Choices
**Backend Language:** TypeScript (Express.js on Node.js)<br>
**Backend API:** GraphQL<br>
**Database:** MongoDB<br>
**User Auth:** Yes<br>
**File Storage:** Yes<br>

## Table of Contents
* 📝 [Documentation](#documentation)
* 👷 [Getting Started](#getting-started)
  * ✔️ [Prerequisites](#prerequisites)
  * ⚙️ [Setup](#setup)
* ✨ [Linting & Formatting](#linting--formatting)
* 💻 [The Team](#the-team)

## Documentation

[Starter Code](https://uwblueprint.github.io/starter-code-v2)</br>
[CWC Notion](https://www.notion.so/uwblueprintexecs/Child-Witness-Centre-3ed5430a01d0495fbde523944521c00a)

## Getting Started

### Prerequisites

* Install Docker Desktop ([MacOS](https://docs.docker.com/docker-for-mac/install/) | [Windows (Home)](https://docs.docker.com/docker-for-windows/install-windows-home/) | [Windows (Pro, Enterprise, Education)](https://docs.docker.com/docker-for-windows/install/) | [Linux](https://docs.docker.com/engine/install/#server)) and ensure that it is running
* Ask the current PL to receive access to ENV Variables

### Setup

1. Clone this repository and `cd` into the project folder
```bash
git clone https://github.com/uwblueprint/child-witness-centre.git
cd child-witness-centre
```
2. Ensure that environment variables have been added to the following directories:
```
/.env
/frontend/.env
```
3. Run the application
```bash
docker compose up --build
```

## Linting & Formatting
### Mac
```bash
docker exec -it CWC-backend /bin/bash -c "yarn fix"
docker exec -it CWC-frontend /bin/bash -c "yarn fix"
```

### Windows
```bash
docker exec -it CWC-backend bash -c "yarn fix"
docker exec -it CWC-frontend bash -c "yarn fix"
```
## The Team
### Term 1 (W24):
**Project Lead:** Owen Sellner<br>
**Product Managers:** Helen Guan & Rachel Scott<br>
**Developers:** Aathithan Chandrabalan, Braydon Wang, Carolyn Zhang, Cynthia Shen, Debanshi Todi, Jane Wu, Ryan Sun, Sohail Sayed<br>
**Designers:** Levina Indrawan, Weinna Zheng, Eric Yam<br>

Huge shoutout to the Internal Tools team for creating StarterCode v2!<br>
