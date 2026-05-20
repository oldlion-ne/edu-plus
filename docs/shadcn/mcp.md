---
title: MCP Server
description: Use the shadcn MCP server to browse, search, and install components.
---

# MCP Server

The shadcn MCP Server allows AI assistants to interact with items from registries. You can browse available components, search for specific ones, and install them directly into your project using natural language.

For example, you can ask an AI assistant to:
- *"Show me all available components in the shadcn registry"*
- *"Add the button, dialog and card components to my project"*
- *"Create a contact form using components from the @eduplus registry"*

Registries are configured in your project's `components.json` file.

```json
{
  "registries": {
    "@eduplus": "file:///c:/edu-plus/registry.json"
  }
}
```

---

## Configuration

Add the following to your active `mcp.json` file to register the server:

```json
{
  "mcpServers": {
    "shadcn": {
      "command": "npx",
      "args": [
        "-y",
        "shadcn@latest",
        "mcp",
        "start"
      ]
    }
  }
}
```

This starts the server and connects it to your active editor environment (Claude Code, Cursor, or VS Code). Once running, AI assistants can query your custom registries and add elements locally with 100% path accuracy.
