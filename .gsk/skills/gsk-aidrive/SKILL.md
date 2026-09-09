---
name: gsk-aidrive
version: 1.0.0
description: 'AI-Drive file storage and management, plus the generic web downloader:
  download_video / download_audio / download_file fetch a URL (YouTube, social media,
  direct file links) server-side into the drive and return a download link. Canonical
  actions: ls, find, mkdir, rm, move, get_readable_url, download, download_video,
  download_audio, download_file, compress, decompress, share, unshare, access, link,
  unlink, upload, list_trash, restore. `rm` moves native entries to recoverable trash
  and unlinks delegated aliases without touching their source. `ls` reads one directory;
  use indexed `find` to locate names across the drive. `shared_with_me` is a view
  across source containers; ls it first and reuse a returned `source_id`. A delegated
  LinkNode row returns `link_workspace_id`; reuse it as `--source` to mount the live
  source entry. `download <ai-drive-path> [local-path]` copies a drive file OUT to
  local disk (the path may be spelled `aidrive://...`); `download_file --file_url
  <url>` goes the opposite direction, saving an external URL INTO the drive.'
metadata:
  category: general
  requires:
    bins:
    - gsk
  cliHelp: gsk drive --help
---

# gsk-aidrive

**PREREQUISITE:** Read `../gsk-shared/SKILL.md` for auth, global flags, and security rules.

AI-Drive file storage and management, plus the generic web downloader: download_video / download_audio / download_file fetch a URL (YouTube, social media, direct file links) server-side into the drive and return a download link. Canonical actions: ls, find, mkdir, rm, move, get_readable_url, download, download_video, download_audio, download_file, compress, decompress, share, unshare, access, link, unlink, upload, list_trash, restore. `rm` moves native entries to recoverable trash and unlinks delegated aliases without touching their source. `ls` reads one directory; use indexed `find` to locate names across the drive. `shared_with_me` is a view across source containers; ls it first and reuse a returned `source_id`. A delegated LinkNode row returns `link_workspace_id`; reuse it as `--source` to mount the live source entry. `download <ai-drive-path> [local-path]` copies a drive file OUT to local disk (the path may be spelled `aidrive://...`); `download_file --file_url <url>` goes the opposite direction, saving an external URL INTO the drive.

## Usage

```bash
gsk drive [options]
```

**Aliases:** `drive`

## Flags

| Flag | Required | Description |
|------|----------|-------------|
| `<action>` (positional) | Yes | Action to perform (string, one of: ls, find, mkdir, rm, move, get_readable_url, download, download_video, download_audio, download_file, compress, decompress, share, unshare, access, link, unlink, upload, list_trash, restore) |
| `--workspace` | No | AI Drive location. my_drive owns your bytes and quota; shared_drive selects managed org, GenTeam, Hub, or authorized knowledge drives; shared_with_me is an ACL-filtered view across both kinds of container and owns no bytes or quota. (string, one of: my_drive, shared_with_me, shared_drive, default: `my_drive`) |
| `--source` | No | Stable source_id returned by ls in shared_with_me or shared_drive. It identifies the storage-owning drive and entry; names are accepted only when unique. (string) |
| `--share` | No | Deprecated alias for source, retained for older gsk scripts. (string) |
| `--to` | No | Who to share with, for share/unshare: an email address; My Drive also accepts 'org' / 'group:<uid>'. Managed Drive sources use email or general_access. (string) |
| `--permission` | No | What the recipient or delegated mount may do: view or edit (share/link). The public link audience can only ever view. (string, one of: view, edit, default: `view`) |
| `--link_name` | No | Optional destination alias for link. The source entry's current name is used when omitted. (string) |
| `--general_access` | No | Who else can open it, for share without a recipient: restricted, org, or link. (string, one of: restricted, org, link) |
| `--organization_id` | No | Which organization to share with, when you belong to more than one and use to=org or to=group:<uid>. (string) |
| `--expires_at` | No | Optional ISO-8601 UTC instant after which the access stops, e.g. 2026-12-31T00:00:00+00:00. (string) |
| `-p`, `--path` | No | Path to file or folder for ls, mkdir, rm, move, get_readable_url. For link: the existing source path in My Drive. For unlink: the LinkNode path in the selected managed source. For compress: folder path to compress. For decompress: archive file path to extract. For find: directory to search within (default '/' searches everywhere). (string) |
| `-q`, `--query` | No | Filename search keyword for find. Matches files and directories whose name contains the keyword. Case-insensitive. Supports partial matches. (string) |
| `-f`, `--filter_type` | No | Filter by entry type for ls (improves performance): all (default), file, directory. Use 'file' when only need files. (string, one of: all, file, directory) |
| `--file_type` | No | Filter by file MIME type for ls (improves performance): all (default), audio, video, image. Combine with filter_type='file' for best results. (string, one of: all, audio, video, image) |
| `--target_path` | No | Destination entry path for move; destination directory for restore (the original filename is retained); destination directory inside the selected Shared Drive source for link. (string) |
| `--entry_id` | No | Stable entry id, required by restore. (string) |
| `--target_folder` | No | Destination folder for download_video, download_audio, and download_file (string) |
| `--video_url` | No | Video URL to save into Drive with download_video (string) |
| `--audio_url` | No | Audio/video URL to save into Drive with download_audio (string) |
| `--file_url` | No | External file URL to save into Drive with download_file (string) |
| `--file_name` | No | Filename for download_file (for example annual_report.pdf); inferred when omitted (string) |
| `--file_content` | No | Content to upload to AI Drive. Can be plain text or base64-encoded binary data. For text files (txt, md, json, csv, etc.), provide plain text content. For binary files, provide base64-encoded content with 'base64:' prefix. Size limit: 1MB without confirmation, 5MB absolute maximum. (string) |
| `--upload_path` | No | Target path for upload action (must start with '/' and include filename). To upload a new version of an existing file, reuse the same path with overwrite=true instead of creating v2/_final name variants; give genuinely new artifacts (e.g. each run of a recurring workflow) their own path. Create parent directories with mkdir first if they don't exist. (string) |
| `--overwrite` | No | Set to true to overwrite the existing file at upload_path (upload action only; default false fails if the path exists). (boolean) |
| `--content_type` | No | MIME type of the content. If not provided, will be auto-detected from filename. Common types: text/plain, text/markdown, application/json, text/csv (string) |
| `--confirmed` | No | Set to true to confirm upload when: (1) file size > 1MB, or (2) content contains potentially sensitive patterns. If confirmation is required but not provided, upload will fail with a warning. (boolean) |

## Local Drive Transfers

- Upload a file or directory with `gsk drive upload --local_file <local-path> --upload_path /destination` (add `--override` to replace existing files). For shared locations, also pass `--workspace shared_with_me|shared_drive --source <source_id>`. The source drive owns the uploaded bytes and quota.
- Download to this machine with `gsk drive download <drive-path> [local-path]`; this is distinct from `download_file`, which saves an external URL into Drive.

## Local File Support

Parameters that accept URLs (`--video_url`, `--audio_url`, `--file_url`) also accept local file paths. The CLI automatically uploads local files before sending to the API.

## See Also

- [gsk-shared](../gsk-shared/SKILL.md) — Authentication and global flags
