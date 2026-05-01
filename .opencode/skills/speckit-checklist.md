# speckit.checklist

Generate quality checklists for specifications, plans, or tasks to validate completeness, clarity, consistency, and traceability.

## When to use

Use this skill when you need to:
- Validate specification quality before planning
- Check plan completeness after manual changes
- Verify requirements traceability
- Generate focused checklists for specific quality gates

## Instructions

1. Read the target feature specification from `spec.md`
2. Read the technical plan from `plan.md` (if exists)
3. Read `tasks.md` (if checking implementation readiness)
4. Determine focus areas:
   - **Content Quality**: No implementation details, focused on business value
   - **Requirements Completeness**: All requirements testable, no [NEEDS CLARIFICATION] markers
   - **Requirements Clarity**: Unambiguous, measurable success criteria
   - **Requirements Consistency**: Across spec, plan, and contracts
   - **Acceptance Criteria Quality**: Measurable, traceable
   - **Scenario & Edge Case Coverage**: All user stories covered
   - **Non-Functional Requirements**: Performance, security, availability
   - **Ambiguities & Conflicts**: No contradictory statements
5. Generate checklist in `checklists/` folder:
   - For spec: `requirements.md` (spec quality checklist)
   - For plan: `plan-quality.md` (plan quality checklist)
   - For generic: `checklist.md`
6. Format each item as:
   ```
   - [ ] CHK### Description [Source] | Status: OK/Pending | Evidence: ... | Action: ...
   ```
7. Set initial status based on document analysis
8. Update `feature.json` with checklist pointer

## Checklist Structure

```markdown
# [Type] Quality Checklist: [Feature Name]

**Purpose**: [What this checklist validates]
**Created**: [Date]
**Feature**: [spec.md link]

## Content Quality
- [ ] CHK001: No implementation details [Source] | Status: ...

## Requirements Completeness
- [ ] CHK002: No [NEEDS CLARIFICATION] markers [Source] | Status: ...

## Requirements Clarity
- [ ] CHK003: Requirements are testable [Source] | Status: ...

## Requirements Consistency
- [ ] CHK004: Consistent across spec/plan/contracts [Source] | Status: ...

## Acceptance Criteria Quality
- [ ] CHK005: Measurable outcomes defined [Source] | Status: ...

## Scenario & Edge Case Coverage
- [ ] CHK006: User scenarios cover primary flows [Source] | Status: ...

## Non-Functional Requirements
- [ ] CHK007: Performance goals quantified [Source] | Status: ...

## Ambiguities & Conflicts
- [ ] CHK008: No contradictory statements [Source] | Status: ...
```

## Focus Options

### Focus: Quality Gate Before Implementation
```
/speckit.checklist Generate checklist for 001-plataforma-inversiones-ia
Evaluate consistency between spec and plan, quality of project structure,
traceability of requirements, technical risks, acceptance criteria.
```

### Focus: Specific Topic (e.g., Structure)
```
/speckit.checklist Focus on project structure quality.
Check if frontend/backend separation is clear, ownership by folder,
and if it aligns with constitutional requirements.
```

## Rules

1. **Mark as [ ]**: Initially all items unchecked until resolved
2. **Status OK/Pending**: Based on document analysis
3. **Evidence**: Must reference specific document sections
4. **Action**: Suggest specific improvements
5. **Update feature.json**: Set checklist pointer
6. **Don't overwrite**: Create new file or append with clear timestamp

## Output Files

- `checklists/requirements.md` - Spec quality checklist
- `checklists/plan-quality.md` - Plan quality checklist  
- `checklists/checklist.md` - Generic checklist

## Git Hook

Optional Pre-Hook: git
Command: /speckit.git.commit
Description: Auto-commit before checklist generation
Prompt: Commit outstanding changes before checklist?
To execute: /speckit.git.commit

Optional Post-Hook: git
Command: /speckit.git.commit
Description: Auto-commit after checklist generation
Prompt: Commit checklist changes?
To execute: /speckit.git.commit
