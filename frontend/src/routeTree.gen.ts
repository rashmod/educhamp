/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as TestIndexImport } from './routes/test/index'
import { Route as TestWarningImport } from './routes/test/warning'
import { Route as TestReportTestIdImport } from './routes/test/report.$testId'

// Create/Update Routes

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const TestIndexRoute = TestIndexImport.update({
  id: '/test/',
  path: '/test/',
  getParentRoute: () => rootRoute,
} as any)

const TestWarningRoute = TestWarningImport.update({
  id: '/test/warning',
  path: '/test/warning',
  getParentRoute: () => rootRoute,
} as any)

const TestReportTestIdRoute = TestReportTestIdImport.update({
  id: '/test/report/$testId',
  path: '/test/report/$testId',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/test/warning': {
      id: '/test/warning'
      path: '/test/warning'
      fullPath: '/test/warning'
      preLoaderRoute: typeof TestWarningImport
      parentRoute: typeof rootRoute
    }
    '/test/': {
      id: '/test/'
      path: '/test'
      fullPath: '/test'
      preLoaderRoute: typeof TestIndexImport
      parentRoute: typeof rootRoute
    }
    '/test/report/$testId': {
      id: '/test/report/$testId'
      path: '/test/report/$testId'
      fullPath: '/test/report/$testId'
      preLoaderRoute: typeof TestReportTestIdImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/test/warning': typeof TestWarningRoute
  '/test': typeof TestIndexRoute
  '/test/report/$testId': typeof TestReportTestIdRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/test/warning': typeof TestWarningRoute
  '/test': typeof TestIndexRoute
  '/test/report/$testId': typeof TestReportTestIdRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/test/warning': typeof TestWarningRoute
  '/test/': typeof TestIndexRoute
  '/test/report/$testId': typeof TestReportTestIdRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/test/warning' | '/test' | '/test/report/$testId'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/test/warning' | '/test' | '/test/report/$testId'
  id: '__root__' | '/' | '/test/warning' | '/test/' | '/test/report/$testId'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  TestWarningRoute: typeof TestWarningRoute
  TestIndexRoute: typeof TestIndexRoute
  TestReportTestIdRoute: typeof TestReportTestIdRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  TestWarningRoute: TestWarningRoute,
  TestIndexRoute: TestIndexRoute,
  TestReportTestIdRoute: TestReportTestIdRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/test/warning",
        "/test/",
        "/test/report/$testId"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/test/warning": {
      "filePath": "test/warning.tsx"
    },
    "/test/": {
      "filePath": "test/index.tsx"
    },
    "/test/report/$testId": {
      "filePath": "test/report.$testId.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
