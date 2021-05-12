# openapi-generator-generate-action

This action installs and runs [OpenAPI Generator](https://openapi-generator.tech/).

## Usage

See [action.yaml](https://github.com/craicoverflow/openapi-generator-generate-action/blob/main/action.yml)

Basic:

```yaml
steps:
- uses: actions/openapi-generator-action@v0.1
  with:
    generator: 'go'
    input: petstore.yaml
```

## License

The scripts and documentation in this project are released under the [MIT License](LICENSE).

## Contributions

Are welcome.
