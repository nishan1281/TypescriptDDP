class ProjectInput {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLFormElement;

    titleInputElement : HTMLInputElement;
    descriptionInputElement : HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
        // Get the <template> element with the id 'project-input'
        this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;

        // Get the <div> element with the id 'app' where the form will be rendered
        this.hostElement = document.getElementById('app')! as HTMLDivElement;

        // Import the content of the <template> element (including its contents)
        const importedNode = document.importNode(this.templateElement.content, true);

        // Get the first child element of the imported node, which is the <form> element
        this.element = importedNode.firstElementChild as HTMLFormElement;
        this.element.id ='user-input';

        this.titleInputElement = this.element.querySelector('#title')! as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector('#description')! as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector('#people')! as HTMLInputElement;

        // Call the private method to attach the form to the host element
        this.attach();
        this.configure();
    }

    // Method to insert the form element into the host element
    private attach() {
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    }

    private submitHandler(event: Event){
        event.preventDefault();
        console.log(this.titleInputElement.value);
    }

    private configure(){
        this.element.addEventListener('submit', this.submitHandler.bind(this));
    }
}


const projectInput= new ProjectInput();

