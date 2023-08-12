// Decorator: AutoBind
// Automatically binds a class method to its instance, ensuring proper context.
function AutoBind (_: any, _1: string, descriptor: PropertyDescriptor){
    const originalMethod = descriptor.value; //accessing body of the original method.

    // Adjusted descriptor with binding behavior.
    const adjustedDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get(){
            const boundFn = originalMethod.bind(this); // Bind the method to the class instance.
            return boundFn;
        }
    };
    return adjustedDescriptor;
}

// Class: ProjectInput
// Represents an input form with various methods to handle user interaction.

class ProjectInput {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLFormElement;

    titleInputElement : HTMLInputElement;
    descriptionInputElement : HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
        //TODO:1 Get the <template> element with the id 'project-input'
        this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;

        //TODO: 2 Get the <div> element with the id 'app' where the form will be rendered
        this.hostElement = document.getElementById('app')! as HTMLDivElement;

        //TODO: 3 Import the content of the <template> element (including its contents)
        const importedNode = document.importNode(this.templateElement.content, true);

        //TODO: 4 Get the first child element of the imported node, which is the <form> element
        this.element = importedNode.firstElementChild as HTMLFormElement;
        this.element.id ='user-input';

        // Assign input elements
        this.titleInputElement = this.element.querySelector('#title')! as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector('#description')! as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector('#people')! as HTMLInputElement;

        //TODO: 5 Call the private method to attach the form to the host element
        this.attach();
        this.configure();
    }

    // Method: attach
    // Inserts the form element into the host element.
    private attach() {
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    }

    // TODO: 6. Method to validate user input. Using tuple with three values.
    private gatherUserInput():[string, string, number]| void{
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;

        // ... (user input validation logic)
        if(
            enteredTitle.trim().length=== 0||
            enteredDescription.trim().length===0||
            enteredPeople.trim().length===0
        ){
            alert('Invalid injput, prlease try again later');
            return;
        }
        else {
            return [enteredTitle, enteredDescription, +enteredPeople];
        }
    }

    // Method: clearInputs
    // Clears input fields.
      private clearInputs() {
        this.titleInputElement.value='';
        this.descriptionInputElement.value='';
        this.peopleInputElement.value='';
    }

    // When the autobind decorator is used, it automatically binds class methods
    // to the instance of the class where they are defined. T
    @AutoBind
    private submitHandler(event: Event){
        event.preventDefault();
        // TODO: 7. Collect user input values using an external method.
        const userInput = this.gatherUserInput();

        // TODO: 8. Destructure the array of three values.
        if (Array.isArray(userInput)){
            const [title, description, people] = userInput;
            console.log(title, description, people);
        }

        //TODO: 9. clear all the input in the form by external method
        this.clearInputs();

    }

    // Method: configure
    // Configures event listeners and bindings.
    private configure(){
        // TODO: 10. Configure the event listener for form submission
        this.element.addEventListener('submit', this.submitHandler);
    }
}

// Create an instance of the ProjectInput class
const projectInput= new ProjectInput();

