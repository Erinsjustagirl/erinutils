/*
   Created with ErinForge
   https://Erinsjustagirl.github.io/erinforge
   original at https://jwklong.github.io/extforge
*/
(async function(Scratch) {
    const variables = {};


    if (!Scratch.extensions.unsandboxed) {
        alert("This extension needs to be unsandboxed to run!")
        return
    }

    const ExtForge = {
        Broadcasts: new function() {
            this.raw_ = {};
            this.register = (name, blocks) => {
                this.raw_[name] = blocks;
            };
            this.execute = async (name) => {
                if (this.raw_[name]) {
                    await this.raw_[name]();
                };
            };
        },

        Variables: new function() {
            this.raw_ = {};
            this.set = (name, value) => {
                this.raw_[name] = value;
            };
            this.get = (name) => {
                return this.raw_[name] ?? null;
            }
        },

        Vector: class {
            constructor(x, y) {
                this.x = x;
                this.y = y;
            }

            static from(v) {
                if (v instanceof ExtForge.Vector) return v
                if (v instanceof Array) return new ExtForge.Vector(Number(v[0]), Number(v[1]))
                if (v instanceof Object) return new ExtForge.Vector(Number(v.x), Number(v.y))
                return new ExtForge.Vector()
            }

            add(v) {
                return new ExtForge.Vector(this.x + v.x, this.y + v.y);
            }

            set(x, y) {
                return new ExtForge.Vector(x ?? this.x, y ?? this.y)
            }
        },

        Utils: {
            setList: (list, index, value) => {
                [...list][index] = value;
                return list;
            },
            lists_foreach: {
                index: [0],
                value: [null],
                depth: 0
            },
            countString: (x, y) => {
                return y.length == 0 ? 0 : x.split(y).length - 1
            }
        }
    }

    class Extension {
        getInfo() {
            return {
                "id": "eringirlMathUtils",
                "name": "Erin's Math Utils",
                "color1": "#fd75ff",
                "blocks": [{
                    "opcode": "block_92710f6d4e7dd77a",
                    "text": "[96971370a4bb70fd] != [6f1a4721103e5e0b]",
                    "blockType": "Boolean",
                    "arguments": {
                        "96971370a4bb70fd": {
                            "type": "string",
                            "defaultValue": "42"
                        },
                        "6f1a4721103e5e0b": {
                            "type": "string",
                            "defaultValue": "50"
                        }
                    }
                }, {
                    "opcode": "block_de0aa6c87316a4b3",
                    "text": "is [cac1e3b43213e1b2] even?",
                    "blockType": "Boolean",
                    "arguments": {
                        "cac1e3b43213e1b2": {
                            "type": "number",
                            "defaultValue": 2
                        }
                    }
                }, {
                    "opcode": "block_8f5d2a4319d1ca4e",
                    "text": "is [625ec555c144dfce] divisible by [f1e53f2c0afb2d97] ?",
                    "blockType": "Boolean",
                    "arguments": {
                        "625ec555c144dfce": {
                            "type": "number",
                            "defaultValue": 50
                        },
                        "f1e53f2c0afb2d97": {
                            "type": "number",
                            "defaultValue": 5
                        }
                    }
                }, {
                    "opcode": "block_a6443e9713f4973e",
                    "text": "is [6669d1dd8d617355] between [687afe478315e6e8] and [1a7e7e04ba82182a] ?",
                    "blockType": "Boolean",
                    "arguments": {
                        "6669d1dd8d617355": {
                            "type": "number",
                            "defaultValue": 5
                        },
                        "687afe478315e6e8": {
                            "type": "number",
                            "defaultValue": 1
                        },
                        "1a7e7e04ba82182a": {
                            "type": "number",
                            "defaultValue": 10
                        }
                    }
                }, {
                    "opcode": "block_ad16693ada7b638f",
                    "text": "factors of [866c2cd47cd9f335]",
                    "blockType": "reporter",
                    "arguments": {
                        "866c2cd47cd9f335": {
                            "type": "number",
                            "defaultValue": 10
                        }
                    }
                }, {
                    "opcode": "block_7662b291bbc3ff7c",
                    "text": "multiples of  [caa4e91c9102e81e] length [a4dc502a8596589b]",
                    "blockType": "reporter",
                    "arguments": {
                        "caa4e91c9102e81e": {
                            "type": "number",
                            "defaultValue": 5
                        },
                        "a4dc502a8596589b": {
                            "type": "number",
                            "defaultValue": 2
                        }
                    }
                }, {
                    "opcode": "block_0537c44e228693ef",
                    "text": "is [9d988afa9558c23b] prime?",
                    "blockType": "Boolean",
                    "arguments": {
                        "9d988afa9558c23b": {
                            "type": "number",
                            "defaultValue": 4
                        }
                    }
                }, {
                    "opcode": "block_f102da8513e2c161",
                    "text": "flip coin",
                    "blockType": "reporter",
                    "arguments": {}
                }]
            }
        }
        async block_92710f6d4e7dd77a(args) {
            return ((!(args["96971370a4bb70fd"] == args["6f1a4721103e5e0b"])))
        }
        async block_de0aa6c87316a4b3(args) {
            return (((args["cac1e3b43213e1b2"] % (2)) == ("0")))
        }
        async block_8f5d2a4319d1ca4e(args) {
            return (((args["625ec555c144dfce"] % args["f1e53f2c0afb2d97"]) == ("0")))
        }
        async block_a6443e9713f4973e(args) {
            return (((args["6669d1dd8d617355"] >= args["687afe478315e6e8"]) && (args["6669d1dd8d617355"] <= args["1a7e7e04ba82182a"])))
        }
        async block_ad16693ada7b638f(args) {
            ExtForge.Variables.set("factorsOf", [])
            for (let i = (1); i <= args["866c2cd47cd9f335"]; i += (1)) {
                if (await extension["block_8f5d2a4319d1ca4e"]({
                        "625ec555c144dfce": args["866c2cd47cd9f335"],
                        "f1e53f2c0afb2d97": Number(i)
                    })) {
                    ExtForge.Variables.set("factorsOf", (ExtForge.Variables.get("factorsOf")
                        .concat(String(i))))
                };
            };
            return (ExtForge.Variables.get("factorsOf"))
        }
        async block_7662b291bbc3ff7c(args) {
            ExtForge.Variables.set("multiplesOf", [])
            for (let i = (1); i <= args["a4dc502a8596589b"]; i += (1)) {
                ExtForge.Variables.set("multiplesOf", (ExtForge.Variables.get("multiplesOf")
                    .concat(Scratch.Cast.toString((Number(i) * args["caa4e91c9102e81e"])))))
            };
            return (ExtForge.Variables.get("multiplesOf"))
        }
        async block_0537c44e228693ef(args) {
            if ((args["9d988afa9558c23b"] < (2))) {
                return (false)
            };
            for (let i = (2); i <= (args["9d988afa9558c23b"] - (1)); i += (1)) {
                if (await extension["block_8f5d2a4319d1ca4e"]({
                        "625ec555c144dfce": args["9d988afa9558c23b"],
                        "f1e53f2c0afb2d97": Number(i)
                    })) {
                    return (false)
                };
            };
            return (true)
        }
        async block_f102da8513e2c161(args) {
            return ((Math.random() > .5))
        }
    }

    let extension = new Extension();
    // code compiled from erinforge
    // i felt like adding the multiples of block to
    // what would otherwise be a bool utils block

    Scratch.extensions.register(extension);
})(Scratch);
