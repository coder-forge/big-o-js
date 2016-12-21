"use strict";

const assert = require('chai').assert,
    BigOAnalyze = require('../../lib/bigoAnalyze'),
    expect = require('chai').expect;
let bigoAnalyze;

describe('BigOAnalyze', ()=>{

    beforeEach(()=>{
        bigoAnalyze = new BigOAnalyze();
    });

    it('will analyze a stringified function', (done)=>{

        let testCalled = false;

        const testFn = function underTest(){
            testCalled = true;
        };

        bigoAnalyze.start(testFn)
            .then(res => {
                assert.equal(testCalled, true);
                expect(res).to.have.property('start').to.be.instanceOf(Array);
                expect(res).to.have.property('end').to.be.instanceOf(Array);
                done();
            });
    });
});
