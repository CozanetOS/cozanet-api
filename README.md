# CozanetOS API Layer (cozanet-api)

An integral component of the **CozanetOS** ecosystem—the AI-native operating system.

---

## Overview

The intelligent, AI-native API integration gateway, orchestrator, and discovery hub for CozanetOS. It serves as the single unified entry point for all external services, model providers, and third-party integrations, managing rate limits, cost optimization, failover, and secure routing with native intelligence.

---

## Core Capabilities

- **API Registry**: A dynamic and secure catalog of all connected external APIs, tracking active schemas and endpoints.
- **API Key Management**: Comprehensive lifecycle management of external service keys including secure storage, scheduled rotation, and automated expiry tracking.
- **API Gateway**: A high-performance, unified entry point handling all inbound and outbound external communication with schema validation.
- **Provider Routing**: Intelligent, context-aware routing across LLM providers (including OpenAI, Anthropic, Gemini, Groq, DeepSeek, and more) to balance latency, cost, and output quality.
- **Cost Tracking**: Granular, per-request cost estimation and real-time tracking of monthly budgets across all APIs and model providers.
- **Usage Tracking**: Detailed metrics capturing token counts (prompt, completion, cached), exact request counts, and multi-point latency breakdowns.
- **Health Monitoring**: Automated, background uptime and responsiveness checks for all registered third-party APIs and platform providers.
- **Rate Limit Monitoring**: Real-time quota tracking per provider to prevent exhaustion, anticipating rate limit caps before they occur.
- **Automatic Provider Switching**: Instant failover and fallback routing when primary provider limits are hit, ensuring 100% uptime for agentic workflows.
- **SDK Management**: Dynamic management of localized and global client libraries and wrappers for every integrated provider.
- **Webhook Support**: Robust infrastructure for handling both inbound webhook triggers and outbound webhook dispatches with signature verification.
- **API Discovery**: Intelligent auto-detection of available APIs, capabilities, and parameters from configuration files and system environment.
- **Caching**: Highly optimized response caching (semantic and exact-match) to minimize duplicate external API requests and reduce token costs.
- **Retry Logic**: Resilient, configurable retry policies featuring exponential backoff, jitter, and automatic circuit breaking under high failure rates.
- **OAuth Flow Management**: Seamless OAuth 2.0 flow orchestrator for integrating user and system accounts with third-party SaaS services.

---

## Architecture & Components

The internal components of `cozanet-api` are engineered with high performance, resilience, and strict decoupling:

- **Gateway & Proxy**: Handles raw request/response cycles, protocol translation, and request validation.
- **Orchestration Engine**: Determines provider routing, failover rules, and intercepts calls for cost/rate analysis.
- **Telemetry & Cost Tracking Core**: Computes tokens and logs usage/latency metrics asynchronously.
- **Credential & Key Registry**: Interacts with secure storage to inject auth tokens on-the-fly without exposing them to caller logs.
- **Caching & Resiliency Manager**: Maintains redis/memory cache and manages circuit breakers.

---

## Interface & API Overview

### Endpoint Patterns

*   `POST /v1/gateway/chat/completions` - Unified chat completion proxy with fallback.
*   `GET /v1/registry/apis` - Lists all dynamically discovered and registered APIs.
*   `POST /v1/keys/rotate` - Initiates automated rotation for a specific provider credential.
*   `GET /v1/metrics/costs` - Returns real-time cost breakdown by provider, model, and calling agent.

### Example SDK Invocation

```python
from cozanet_api import CozanetGateway

gateway = CozanetGateway(api_key="czn_...")
response = gateway.chat.complete(
    model="intelligence-preferred", # Dynamic routing tag
    messages=[{"role": "user", "content": "Analyze system state."}],
    fallback_policy="cost-optimized"
)
```

---

## CozanetOS Ecosystem Integration

`cozanet-api` is fully integrated into the CozanetOS AI-native architecture and exchanges real-time data with other primary engines:

- **cozanet-core**: Feeds execution telemetry to the main OS kernel and receives high-level orchestration directives.
- **cozanet-security**: Relies on the security engine for credential encryption (AES-256) and secure key vault access.
- **cozanet-plugins**: Exposes registered third-party APIs as executable tools for OS plugins.
- **cozanet-monitoring**: Exports performance counters, latency stats, and cost limits to the system-wide logging daemon.

---

## Quick-Start Notes

### Installation
Ensure that the main CozanetOS platform is installed. To add this engine to your installation:

```bash
czn-install install cozanet-api
```

### Configuration
Update your unified `cozanet.toml` configuration to specify operational thresholds:

```toml
[cozanet_api]
enabled = true
log_level = "info"
```

### Direct Run
To run the module manually in sandbox developer mode:

```bash
python -m cozanet_api.main --dev
```

---

*CozanetOS: Empowering next-generation computing with secure, decentralized, AI-native core primitives.*
