# Arcadia Explorer

## Install

Copy the `.env` variables.

```bash
cp .env.template .env
```

```env
# NodeJS server port, default 3010
SERVER_PORT=
# Nano node RPC domain with port, default http://0.0.0.0:7076
RPC_DOMAIN=
# Used to get the ledger size given the nano node installation folder, default /nano/Nano
NODE_FOLDER=
# Error logging (optional)
SENTRY_DNS=
# Translations (optional)
GOOGLE_APPLICATION_CREDENTIALS=
```

- `npm install` - Install dependencies
- `npm start` - Start the Webserver
- `npm run start:server` - On another tab, start the NodeJS server

## Languages

The language set in the Browser determines the language that NanoLooker will load and default to `en` if it's not in the supported list. Since most languages were generated using Google Translation API, some translations may be inaccurate.

Many of the most common languages are supported.

- English (en)
- Français (fr)
- Español (es)
- العربية (ar)
- Deutsch (de)
- فارسی (fa)
- हिन्दी (hi)
- Italiano (it)
- 日本語 (ja)
- 한국어 (ko)
- Nederlands (nl)
- Polski (pl)
- Português (pt)
- Pусский (ru)
- Türkçe (tr)
- Tiếng Việt (vi)
- 中文 (zh)

### Contribution

If you think some strings should be corrected open a PR with the corrections on the [language file](https://github.com/running-coder/nanolooker/tree/master/src/i18n/locales).

### Adding a new language or missing language keys

- Setup a Google translate API key at https://cloud.google.com/translate
- Go to Google Cloud Console > Service Accounts > Keys > Add Key (JSON format). Add the file named as `translate.json` at the root (same level as `package.json`)
- Link that file using its path inside the `.env` under the key `GOOGLE_APPLICATION_CREDENTIALS=translate.json`
- run `npm run translate -- --language=LANGUAGE_CODE` where `LANGUAGE_CODE` is `ru`, `fr`, `es` or any new language supported by Google's API.
- run `npm run translate` to generate for all languages found in the `src/i18n/locale` from `en.json`

### Projects

- [NanoLooker](https://github.com/running-coder/nanolooker)
- [My Nano Ninja](https://mynano.ninja/)
- [NanoCrawler](https://nanocrawler.cc/)
