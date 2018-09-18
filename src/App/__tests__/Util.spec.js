import sinon from 'sinon';
import { debounce, WAIT_MILLISECONDS } from '../Util';
describe('Util', () => {
    describe('debounce', () => {
        it(`should call the function provided after ${WAIT_MILLISECONDS} milliseconds`, done => {
            const callbackFunction = () => { console.log('I was called') };
            debounce(callbackFunction)
                .then((debouncedFn) => {
                    const debouncedSpy = sinon.spy(debouncedFn);
                    expect(debouncedSpy.called).toBe(false);
                    setTimeout(() => {
                        expect(debouncedSpy.called).toBe(true);
                    }, WAIT_MILLISECONDS);
                });
            done();
        })
    })
});
