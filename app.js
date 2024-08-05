class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputContent: '',
      tabTodo: [],
      modif: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleModif = this.handleModif.bind(this);
  }
  handleChange(e) {
    this.setState({ inputContent: e.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.inputContent.trim()) {
      if (this.state.modif !== null) {
        this.setState((state) => {
          const updatedTodos = state.tabTodo.map((item, index) =>
            index === state.modif ? state.inputContent : item
          );
          return {
            tabTodo: updatedTodos,
            inputContent: '',
            modif: null,
          };
        });
      } else {
        this.setState((state) => ({
          tabTodo: [...state.tabTodo, state.inputContent],
          inputContent: '',
        }));
      }
    }
  }

  handleClick(e) {
    this.setState((state) => ({
      tabTodo: state.tabTodo.filter((_, i) => i !== e),
    }));
  }
  handleModif(e) {
    this.setState({
      inputContent: this.state.tabTodo[e],
      modif: e,
    });
  }

  render() {
    return (
      <div className="mt-4">
        <h1 className="text-center mb-3">TODO-LIST</h1>

        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <div class="mb-3">
              <label htmlFor="exampleInputText" className="form-label">
                Entrez votre Liste
              </label>
              <input
                type="Text"
                className="form-control"
                id="exampleInputText"
                value={this.state.inputContent}
                onChange={this.handleChange}
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Submit
            </button>
          </form>

          <h1 className="text-center mb-3">Liste Des Taches</h1>
          <ul>
            {this.state.tabTodo.map((tab, index) => (
              <div className="d-flex gap-2">
                {' '}
                <li key={index} className="">
                  {tab}
                </li>
                <button
                  className="buton bg-danger border-0 mb-3"
                  onClick={() => this.handleClick(index)}
                >
                  X
                </button>
                <button
                  className="buton bg-success border-0 mb-3"
                  onClick={() => this.handleModif(index)}
                >
                  V
                </button>
              </div>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Todo />, document.querySelector('#root'));
