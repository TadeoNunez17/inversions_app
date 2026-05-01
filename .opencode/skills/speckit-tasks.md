# speckit.tasks

Generate executable tasks from the technical plan, decomposed by agent roles following the DR.FIC governance model.

## When to use

Use this skill when you have a complete technical plan (plan.md) and need to:
- Decompose the plan into executable tasks
- Assign tasks to specific agents (Picoro, Goku, Vegeta, Krilin, Bulma)
- Define task dependencies and order
- Prepare tasks for implementation phase

## Instructions

1. Read the technical plan from `plan.md` in the feature directory
2. Read all contract files in `contracts/` folder
3. Read `data-model.md` and `research.md` for context
4. Follow the DR.FIC agent order: Picoro → (Goku || Krilin) → (Vegeta || Bulma) → Dr.FIC
5. Generate tasks organized by phases from the plan
6. Each task must include:
   - Unique ID (T-PHASE-NNN)
   - Assigned agent
   - Dependencies
   - Acceptance criteria
   - Estimated complexity
7. Write tasks to `tasks.md`
8. Update `feature.json` with task pointer

## Task Structure

```markdown
# Tasks: [Feature Name]

## Phase 0: Research & Foundation
### T-0-001: [Task Title]
- **Agent**: Picoro
- **Dependencies**: None
- **Description**: [What needs to be done]
- **Acceptance Criteria**:
  - [ ] Criterion 1
  - [ ] Criterion 2
- **Complexity**: Low/Medium/High
- **Estimated Time**: X hours

### T-0-002: [Task Title]
- **Agent**: Picoro
- **Dependencies**: T-0-001
...
```

## Agent Assignments (DR.FIC Governance)

### Picoro (Architecture & Specification)
- Research tasks
- Contract definition
- Architecture validation
- Specification clarification

### Goku (Implementation)
- Frontend implementation
- UI components
- Client-side logic
- Integration with backend

### Krilin (REST API & Databases)
- Backend API implementation
- Database schema
- Server-side persistence
- Broker adapters

### Vegeta (Optimization & Security)
- Security hardening
- Performance optimization
- Rate limiting
- MFA implementation

### Bulma (Testing & Validation)
- Unit tests
- Integration tests
- Contract tests
- Validation checklists

### Dr.FIC (Human Approval)
- Approve critical decisions
- Validate compliance
- Sign-off on major milestones

## Task Categories

### Foundation Tasks (Phase 0)
- Project setup
- Dependencies installation
- Repository structure
- CI/CD configuration

### Core Implementation (Phase 1)
- Authentication system
- Data models
- REST API endpoints
- Frontend base structure

### Feature Implementation (Phase 2+)
- Signal generation system
- AI advisor integration
- Broker adapters
- Dashboard and visualizations

### Security & Hardening (Phase 3)
- Security audit
- Penetration testing
- Performance optimization
- Rate limiting and MFA

### Testing & Validation (Phase 4)
- Unit test coverage
- Integration testing
- Contract validation
- User acceptance testing

## Rules

1. **Follow agent order**: Picoro → (Goku || Krilin) → (Vegeta || Bulma) → Dr.FIC
2. **No task without acceptance criteria**: Every task must be verifiable
3. **Respect constitution**: No task may violate constitution.md
4. **Document dependencies**: Clear task dependency chain
5. **Assign single agent**: Each task has one primary agent
6. **Update feature.json**: Set task pointer after generation

## Output Files

- `tasks.md` - Main task list
- `feature.json` - Updated with task pointer

## Example Usage

```
/speckit.tasks
```

Or with explicit instruction:
```
/speckit.tasks

Generate tasks from plan.md in 001-plataforma-inversiones-ia
Follow DR.FIC agent order strictly
Assign tasks to: Picoro, Goku, Krilin, Vegeta, Bulma
```

## Next Steps

After task generation:
1. Review `tasks.md` for completeness
2. Execute `/speckit.implement` to start implementation
3. Or use `/speckit.git.commit` to commit task definitions

## Git Hook

Optional Post-Hook: git
Command: /speckit.git.commit
Description: Auto-commit after task generation
Prompt: Commit task definitions?
To execute: /speckit.git.commit
