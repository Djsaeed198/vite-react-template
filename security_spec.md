# Security Specification

This document details the Zero-Trust security invariants, malicious attack payloads, and defense rules for "Otrishneshin" Firestore collections.

## 1. Data Invariants

- **Profiles**: Current users can only read or write their own `/users/{userId}` record. PII data like email must never be exposed to other visitors.
- **Forum discussions**: Authenticated users can create posts, but cannot adjust their `authorId` or `upvotes` field unilaterally. Only the owner can delete or update their post contents.
- **Workspace Sync Logs**: Users can only write and read logs associated with their own `userId` under `/users/{userId}/workspace_logs/{logId}`.
- **Feedback**: Signed-in members can submit reviews/feedback, but cannot modify, edit or truncate other people's feedback records.

## 2. The "Dirty Dozen" Payloads

1. **Self-Assigned Admin Account**: Attempting to write a user profile with administrative claims bypassed.
2. **Post Spoofing**: Attempting to create a forum post under a different username or auth `uid`.
3. **Ghost Writes**: Modifying the ID in `/users/hacker_id` when authenticated as `/users/victim_id`.
4. **Anomalous Field Injection**: Attempting to save a 1.2MB junk value inside a string field (`content`) to trigger high database cost resource exhaustion.
5. **Vote Inflation**: Incrementing personal forum post upvote count without real system verification.
6. **Workspace Audit Espionage**: Attempting to read another user's synchronization log details of Google Workspace.
7. **Privilege Escalation in Feedback**: Attempting to delete general complaints or positive reviews posted by other Austrian-Iranian peers.
8. **Immutable Field Mutagen**: Attempting to update the `createdAt` timestamp of a forum discussion post.
9. **Junk Path variable**: Bypassing ID filters by submitting complex URL character strings as the postId (e.g., `../../../sys/env`).
10. **State short-circuiting**: Updating a feedback or discussion state to skip mandatory validations.
11. **Spoofed Email Access**: Accessing private documents during unregistered states.
12. **Malicious Arrays**: Writing excessive list keys to crash query engines.
