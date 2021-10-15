import './CreateSpecialist.scss';
import Person from '../Person/Person'
import Nav from '../../Layout/Nav'


export default function TypeSpecialty() {
    const typeSpecialty = ["Cardiología", "Endocrinología", "Gastroenterología",
        "Geriatría", "Hematología", "Infectología", "Médico clínico", "Neumología",
        "Neurología", "Nutriología", "Oftalmología", "Oncología", "Pediatría", "Psiquiatría",
        "Toxicología", "Dermatología", "Odontología", "Ginecología", "Otorrinolaringología", "Urología", "Traumatología"]

    return (
        <>

            <Nav />
            <Person />
            <hr />
            <div>
                <label>TIPO DE ESPECIALDAD</label>
                <br />
                {
                    typeSpecialty && typeSpecialty.map((type, index) => {
                        return (
                            <div key={index + "A"} >
                                <label key={index + type}>{type}</label>
                                <input
                                    key={index}
                                    type="checkbox"
                                    name={type}
                                />
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}