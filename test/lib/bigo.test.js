"use strict";

const assert = require('chai').assert,
    config = {
        itterate: 10,
        reduce: (arg, i)=>{return arg;},
    };
let BigOClass = require('../../lib/bigo'),
    bigo;

describe('bigo', ()=>{

    beforeEach(()=>{

        bigo = new BigOClass(config);
    });

    it.only('will set config', ()=>{

        assert.equal(bigo.itterate, config.itterate);
        assert.equal(bigo.reduce.toString(), config.reduce.toString());
    });

    it('will run one itteration of code underTest', ()=>{

        let test = [2,3,1,5],
            expected = {
                runs: [
                    {args: [2,3,1,5], time: 3, result: 4}  //ms
                ]
            }

        return bigo.run(test)
            .then(actual => {
                console.log(actual);
                assert.deepEqual(actual.args, expected.args);
                assert.property(actual.runs[0], 'time');
                assert.property(actual.runs[0], 'result');
            });
    });

    it('will run x amount of itterations', ()=>{

        let test = [2,3,1,5];

        bigo.itterations = 10;

        return bigo.run(test)
            .then(actual => {
                assert.equal(actual.runs.length, 10);
            })
    });

    it('will map array according to filter', ()=>{

        bigo.itterations = 10;
        bigo.args = [2,3,1,5];

        bigo
            .argsItterator([
                function(arg){
                    arg.push(arg[arg.length-1]+1);
                    return arg;
                },
            ])
            .run()
            .then(actual => {
                console.log(actual);
            });
    });
});
