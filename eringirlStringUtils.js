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
                "id": "eringirlStringUtils",
                "name": "Erin's String Utils",
                "color1": "#c273f7",
                "blocks": [{
                    "opcode": "block_86ffaf06cc421621",
                    "text": "is [8cd52938fabdbaaf] empty?",
                    "blockType": "Boolean",
                    "arguments": {
                        "8cd52938fabdbaaf": {
                            "type": "string"
                        }
                    }
                }, {
                    "opcode": "block_24bbcd107a00571a",
                    "text": "is [9f091d67a594c0dc] a palindrome?",
                    "blockType": "Boolean",
                    "arguments": {
                        "9f091d67a594c0dc": {
                            "type": "string",
                            "defaultValue": "racecar"
                        }
                    }
                }, {
                    "opcode": "block_cd3915982c55aa5e",
                    "text": "trim whitespace from both ends of [67066ef3251a9a55]",
                    "blockType": "reporter",
                    "arguments": {
                        "67066ef3251a9a55": {
                            "type": "string",
                            "defaultValue": "   apple   "
                        }
                    }
                }, {
                    "opcode": "block_e3cd873d6a87c216",
                    "text": "turn [d9f2bffa78395991] into char array",
                    "blockType": "reporter",
                    "blockShape": Scratch.BlockShape?.SQUARE,
                    "allowDropAnywhere": true,
                    "arguments": {
                        "d9f2bffa78395991": {
                            "type": "string",
                            "defaultValue": "apple"
                        }
                    }
                }, {
                    "opcode": "block_64282e8f83b84f53",
                    "text": "count words in [d96af2a47ed5a2f0]",
                    "blockType": "reporter",
                    "arguments": {
                        "d96af2a47ed5a2f0": {
                            "type": "string",
                            "defaultValue": "I like apples and bananas!"
                        }
                    }
                }]
            }
        }
        async block_86ffaf06cc421621(args) {
            return ((args["8cd52938fabdbaaf"] == ("")))
        }
        async block_24bbcd107a00571a(args) {
            return ((args["9f091d67a594c0dc"] == [...String(args["9f091d67a594c0dc"])].reverse().join("")))
        }
        async block_cd3915982c55aa5e(args) {
            return ((args["67066ef3251a9a55"]).trim())
        }
        async block_e3cd873d6a87c216(args) {
            return ((args["d9f2bffa78395991"].split((""))))
        }
        async block_64282e8f83b84f53(args) {
            return ((ExtForge.Utils.countString(args["d96af2a47ed5a2f0"], (" ")) + (1)))
        }
    }

    let extension = new Extension();
    // code compiled from erinforge

    Scratch.extensions.register(extension);
})(Scratch);