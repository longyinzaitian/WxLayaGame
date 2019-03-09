
export default class StateMachineUtil {
    
    constructor() {
        try {
            if (undefined == StateMachine || !StateMachine) {
                return;
            }
            console.log('main -> state machine:', StateMachine);
            this.init();
        } catch(err) {
            console.log(err);
        }
    }

    private init(): void {
        let fsm: any = new StateMachine({
            init: 'green',
            transitions: [
                { name: 'warn',  from: 'green',  to: 'yellow' },
                { name: 'panic', from: 'yellow', to: 'red'    },
                { name: 'calm',  from: 'red',    to: 'yellow' },
                { name: 'clear', from: 'yellow', to: 'green'  }
            ],
            methods: {
                onWarn: () => {
                    console.log('on warn.');
                },
                onBeforeWarn: () => {
                    console.log('on before warn.');
                },
                onLeaveWarn: () => {
                    console.log('on leave warn.');
                },
                onEnterYellow: () => {
                    console.log('on enter yellow.');
                },
                onLeaveYellow: () => {
                    console.log('on leave yellow.');
                },
            } 
        });

        console.log('fsm state:', fsm.state);
        fsm.warn();
        fsm.panic();
        fsm.calm();
        fsm.clear();
        console.log('is fsm:', fsm.is('green'));
        console.log('all state:', fsm.allStates());
        console.log('all transitions:', fsm.allTransitions());
        console.log('transitions:', fsm.transitions());
    }
}