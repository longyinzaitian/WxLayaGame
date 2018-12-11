class StateMachineUtil {
    
    constructor() {
        console.log('main -> state machine:', StateMachine);

        let fsm = new StateMachine({
            init: 'green',
            transitions: [
                { name: 'warn',  from: 'green',  to: 'yellow' },
                { name: 'panic', from: 'yellow', to: 'red'    },
                { name: 'calm',  from: 'red',    to: 'yellow' },
                { name: 'clear', from: 'yellow', to: 'green'  }
            ],
            methods: {
                onWarn: function() {
                    console.log('on warn.');
                },
                onBeforeWarn: function() {
                    console.log('on before warn.');
                },
                onLeaveWarn: function() {
                    console.log('on leave warn.');
                },
                onEnterYellow: function() {
                    console.log('on enter yellow.');
                },
                onLeaveYellow: function() {
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