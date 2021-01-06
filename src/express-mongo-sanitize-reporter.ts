import type { Handler, Request } from "express";
// @ts-ignore
import { has } from "express-mongo-sanitize";

export type ReportHandler = (req: Request, key: string) => unknown;
export default function ({ report }: { report: ReportHandler }): Handler {
    return (req, _res, next) => {
        const properties = ["body", "params", "headers", "query"] as const;
        properties.forEach(function (k) {
            if (has(req[k])) {
                report(req, k);
            }
        });
        next();
    };
}
