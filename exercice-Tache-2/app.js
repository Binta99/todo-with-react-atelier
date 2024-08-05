class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Prenom: '',
      Nom: '',
      Email: '',
      Number: '',
      tab: [],
      erreur: '',
      modif: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleModif = this.handleModif.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { Prenom, Nom, Email, Number } = this.state;
    if (!Prenom || !Nom || !Email || !Number) {
      this.setState({ erreur: 'Désolé ! Veuillez remplir tous les champs.' });
      return;
    }
    const nouveauEtudiant = { Prenom, Nom, Email, Number };

    this.setState((prevState) => ({
      tab: [...prevState.tab, nouveauEtudiant],
      Prenom: '',
      Nom: '',
      Email: '',
      Number: '',
      erreur: '',
    }));
  }

  handleClick(e) {
    this.setState((state) => ({
      tab: state.tab.filter((_, i) => i !== e),
    }));
  }

  handleModif(index) {
    const etudiant = this.state.tab[index];
    this.setState({
      Prenom: etudiant.Prenom,
      Nom: etudiant.Nom,
      Email: etudiant.Email,
      Number: etudiant.Number,
      modif: index,
    });
  }

  handleUpdate(e) {
    e.preventDefault();
    const { Prenom, Nom, Email, Number, modif, tab } = this.state;
    if (!Prenom || !Nom || !Email || !Number) {
      this.setState({ erreur: 'Désolé ! Veuillez remplir tous les champs.' });
      return;
    }
    const etudiantMisAJour = { Prenom, Nom, Email, Number };
    const tabMisAJour = [...tab];
    tabMisAJour[modif] = etudiantMisAJour;

    this.setState({
      tab: tabMisAJour,
      Prenom: '',
      Nom: '',
      Email: '',
      Number: '',
      modif: null,
      erreur: '',
    });
  }

  render() {
    return (
      <div className="container mt-5">
        <p className="fw-bold text-center">Jeemacoder gestion utilisateurs</p>

        <div className="d-flex flex-column justify-content-center align-items-center">
          <form
            onSubmit={
              this.state.modif === null ? this.handleSubmit : this.handleUpdate
            }
            className="bg-white px-2 py-4 w-75"
          >
            <div className="forme d-flex gap-2">
              <div className="mb-3 w-50">
                <label htmlFor="prenom" className="form-label fs-5 fw-bold">
                  Prenom
                </label>
                <input
                  type="text"
                  name="Prenom"
                  value={this.state.Prenom}
                  onChange={this.handleChange}
                  className="form-control"
                  id="prenom"
                />
              </div>
              <div className="mb-3 w-50">
                <label htmlFor="Nom" className="form-label fs-5 fw-bold">
                  Nom
                </label>
                <input
                  type="text"
                  name="Nom"
                  value={this.state.Nom}
                  onChange={this.handleChange}
                  className="form-control"
                  id="Nom"
                />
              </div>
            </div>
            <div className="forme d-flex gap-2">
              <div className="mb-3 w-50">
                <label
                  htmlFor="exampleInputEmail1"
                  className="form-label fs-5 fw-bold"
                >
                  Adresse email
                </label>
                <input
                  type="email"
                  name="Email"
                  value={this.state.Email}
                  onChange={this.handleChange}
                  className="form-control"
                  id="exampleInputEmail1"
                />
              </div>
              <div className="mb-3 w-50">
                <label htmlFor="num" className="form-label fs-5 fw-bold">
                  Numéro
                </label>
                <input
                  type="number"
                  name="Number"
                  value={this.state.Number}
                  onChange={this.handleChange}
                  className="form-control"
                  id="num"
                />
              </div>
            </div>
            {this.state.erreur && (
              <p style={{ color: 'red' }}>{this.state.erreur}</p>
            )}
            <button type="submit" className="btn btn-success w-100">
              {this.state.modif === null ? 'Ajouter' : 'Mettre à jour'}
            </button>
          </form>

          <hr />

          <div className="listes border-top w-100 mt-3">
            <p className="fw-bold text-center mt-3">Utilisateurs </p>

            <table className="w-100">
              <thead className="bg-white border">
                <tr>
                  <th className="px-2 fs-5">Prenom</th>
                  <th className="px-2 fs-5">Nom</th>
                  <th className="px-2 fs-5">Email</th>
                  <th className="px-2 fs-5">Numéro</th>
                  <th className="px-2 fs-5 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.tab.map((personne, index) => (
                  <tr key={index}>
                    <td>{personne.Prenom}</td>
                    <td>{personne.Nom}</td>
                    <td>{personne.Email}</td>
                    <td>{personne.Number}</td>
                    <td className="">
                      <button
                        type="button"
                        className="btn btn-warning ms-0 ms-lg-5"
                        onClick={() => this.handleModif(index)}
                      >
                        Modifier
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger ms-0 ms-lg-5"
                        onClick={() => this.handleClick(index)}
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Home />, document.querySelector('#root'));
