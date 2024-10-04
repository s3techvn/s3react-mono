# @s3react/mono

Management all projects and packages with one source

## Commands

### yarn in

```sh
yarn in <project> <pacakge_name>
```

Install the package on internet for a project. Maybe install multiple pacakges and with any flag that yarn supported.

### yarn build

```sh
yarn build <project>
```

Build the project with any flag that yarn supported. Provided that there is a build script inside the project's package.json file

### yarn eject

```sh
yarn eject <project>
```

Run command eject inside package.json's scripts of the project. Can using any flags or other params that supported by script project.

### yarn ln

```sh
yarn ln <package> <project>
```

Install the package inside folder packages into the project.

### yarn lib

```sh
yarn lib <template> <package_name>
```

Generate new Typescript package into packages folder with name `@s3react/<package_name>`. Template supported: 

- `tw`: Make new package with structure support tailwindcss.
- `js`: Make new package with structure for nornmally javascript.

### yarn new

```sh
yarn new <template> <project>
```

Generate new project into projects folder with name `@s3react/<project>`. Template supported:

- `react`: Generate new project with `create-react-app` and Typescript, Tailwindcss.
- `next-app`: Generate new project with App Routing structure, inside folder `src`, Typescript and Tailwindcss.
- `next-page`: Generate new project with Page Routing structure, inside folder `src`, Typescript and Tailwindcss.
- `remix`: Generate new project with RemixJS and Typescript, Tailwindcss.

### yarn rm-p

```sh
yarn rm-p [<project>,...]
```

Remove list of projects provided.

### yarn rm-l

```sh
yarn rm-l [<package>, ...]
```

Remove list of packaged provided.

### yarn rm

```sh
yarn rm <project> [<package>, ...]
```

Remove list of packages installed for the project.

### yarn start

```sh
yarn start <project>
```

Run script `start` inside scripts of the project.

### yarn typecheck

```sh
yarn typecheck <project>
```

Run script `typecheck inside scripts of the project.

