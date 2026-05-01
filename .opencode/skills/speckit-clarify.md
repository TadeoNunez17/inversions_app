# speckit.clarify

Clarify helps identify gaps, missing requirements, and assumptions in a feature specification before planning.

## When to use

Use this skill when you have a draft specification and need to:
- Identify missing functional/non-functional requirements
- Uncover hidden assumptions
- Discover edge cases and user roles not defined
- Prepare the spec for technical planning

## Instructions

1. Read the current spec from `spec.md` in the feature directory
2. Read `requirements.md` to analyze existing requirements
3. Analyze the spec against the constitution (`.specify/memory/constitution.md`)
4. Generate a clarification table with coverage analysis
5. Ask up to 5 strategic clarification questions (max 5 to avoid overwhelming)
6. Identify gaps in:
   - User roles and personas
   - Data management approach
   - Missing features implied but not stated
   - Edge cases
   - Governance and approval workflows
7. Update `requirements.md` with new gaps identified
8. Suggest next steps (usually `/speckit.plan`)

## Clarification Process

### Step 1: Coverage Analysis
Create a table showing:
- Main user objectives (are they clear?)
- Out-of-scope items (are they defined?)
- User roles (are they defined?)
- Governance rules (are they complete?)

### Step 2: Gap Identification
Generate a gaps table with:
- Category (Functional, Non-Functional, Data, UX, Governance)
- Description
- Priority (High/Medium/Low)
- Recommendation

### Step 3: Strategic Questions
Ask maximum 5 questions to clarify critical gaps:
1. Data management format and approach
2. User roles and permissions
3. Implied features that need explicit definition
4. Edge cases and error handling
5. Integration requirements

## Output Format

### Clarification Table
```markdown
## Clarification Coverage

| Area | Status | Notes |
|------|--------|-------|
| Main objectives | Clear | ... |
| Out-of-scope | Defined | ... |
| User roles | Missing | ... |
| Data management | Undefined | ... |
```

### Gaps Table
```markdown
## Gaps Identified

| # | Category | Description | Priority | Recommendation |
|---|----------|-------------|----------|-----------------|
| G1 | User Roles | Visitor vs. recurring user undefined | High | Define user types |
| G2 | Data Mgmt | Episode data format unclear | High | Specify data format |
```

### Questions (Max 5)
```markdown
## Clarification Questions

1. **[Topic]**: [Question]
2. **[Topic]**: [Question]
...
```

## Rules

1. **Max 5 questions**: Don't overwhelm the user
2. **Only clarify, don't implement**: This is analysis only
3. **Respect constitution**: All clarifications must align with constitution.md
4. **Update requirements.md**: Add newly identified gaps
5. **Suggest next step**: Usually `/speckit.plan` after clarification

## Example Usage

```
/speckit.clarify
```

Or with explicit instruction:
```
/speckit.clarify

Analyze spec.md in 001-plataforma-inversiones-ia
Generate up to 5 clarification questions
Update requirements.md with gaps found
```

## Next Steps

After clarification:
1. Answer the clarification questions
2. Update the spec with new requirements
3. Execute `/speckit.plan` to generate technical plan
4. Proceed to `/speckit.tasks` for task decomposition
