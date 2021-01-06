import express, { Request } from "express";
import bodyParser from "body-parser";
import mongoSanitize from "../src/express-mongo-sanitize-reporter";
import request from "supertest";
import assert from "assert";

describe("express-mongo-sanitize-reporter", function () {
    it("should callback report", (done) => {
        const tracker = new assert.CallTracker();
        const callsFunc = tracker.calls((_req: Request, key: string, value: any) => {
            assert.strictEqual(key, "body");
            assert.deepStrictEqual(value, {
                q: "search",
                is: true,
                and: 1,
                even: null,
                $where: "malicious",
                "dotted.data": "some_data"
            });
        }, 1);
        const app = express();
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());

        app.use(
            mongoSanitize({
                report: callsFunc
            })
        );

        app.post("/body", function (req, res) {
            res.status(200).json({
                body: req.body
            });
        });

        request(app)
            .post("/body")
            .send({
                q: "search",
                is: true,
                and: 1,
                even: null,
                $where: "malicious",
                "dotted.data": "some_data"
            })
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .expect(
                200,
                {
                    body: {
                        q: "search",
                        is: true,
                        and: 1,
                        even: null,
                        $where: "malicious",
                        "dotted.data": "some_data"
                    }
                },
                (error) => {
                    tracker.verify();
                    done(error);
                }
            );
    });
});
