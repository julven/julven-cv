const {
	useEffect,
	useState,
	createContext,
	useContext,
	useRef
} = React
const {
	createRoot
} = ReactDOM

const Context = createContext();
const ContextProvider = ({children}) => {

	const [data, setData] = useState(null)
	const [us, setUs] = useState(false)
	const [screen, setScreen] = useState({w: 0, h: 0})

	const resize = () => {

		let w = window.innerWidth, h = window.innerHeight;

		setScreen({w,h})
	}

	useEffect(() => {
		fetch("https://api.country.is/").then(resp => resp.json()).then(resp => {
			console.log(resp.country)
			if(resp.country == "US") setUs(true);
		})
		fetch("data.json").then(resp => resp.json()).then(resp => setData(resp))
		resize()
		window.addEventListener("resize", resize)
	}, [])

	// useEffect(() => {
	// 	console.log(screen)
	// }, [screen])

	return(
		<Context.Provider value={{data, screen, us}}>
			{children}
		</Context.Provider>
		)
}

const Experience = ({data}) => {

	return(
		<div  className="mb-3">
			<p className="fs-3 fw-bold text-secondary text-decoration-underline">Experience</p>
			<ul className="list-group list-group-flush ">
			{ data.experience.map((x, i) =>
				
				<li key={i} className="list-group-item ">
					<p className="h5 mb-1 lh-1">{x.company}</p>
					<p className="mb-1 lh-1 ">Located: <span className="fst-italic fw-bold">{x.location}</span></p>
					<p className="mb-1 lh-1">Position: <span className="fst-italic fw-bold">{x.position}</span></p>
					<p className="mb-1 lh-1">Date: <span className="fst-italic fw-bold">{x.date}</span></p>
					<p className="fst-italic ">{x.description}</p>
				</li>
					
				
			)}
			</ul>
		</div>

	)
}

const Education = ({data}) => {
	return (
		<div style={{maxWidth: 500}} className="mb-3">
			<p className="fs-3 fw-bold  text-secondary text-decoration-underline">Education</p>
			<ul className="list-group list-group-flush ">
				{ data.education.map((x, i) =>
					<li key={i} className="lh-1 list-group-item">
						<p className="fw-bold mb-1">{x.school}</p>			
						<p className="fst-italic mb-1">{x.course}</p>
						<p className="fst-italic mb-1">{x.date}</p>
					</li>
				)}
			</ul>

		</div>
	)
}

const Skills = ({data}) => {

	return(
		<div style={{maxWidth: 500}} className="mb-3">
				<p className="fs-3 fw-bold  text-secondary text-decoration-underline">Skills</p>
				
				<div className="d-flex gap-1 flex-wrap">
				{data.skills.map( (x, i) => {
					return(
						<div key={i} className="badge   bg-secondary px-2 py-1">
							<p className="mb-1 ">{x.skill}</p>
							<div className="d-flex gap-1 text-warning  justify-content-center">
							{
								[ ...Array(x.exp).keys() ].map( (x,i) => <i key={i} className="bi bi-star-fill "></i>)
							
							}
								
							</div>
						</div>
					)
				})}
				</div>
			</div>
	)
}

const Contact = ({data, us}) => {
	return(
		<div  className="mb-3" style={{maxWidth: 500}}>
			<p className="fs-3 fw-bold text-secondary text-decoration-underline">Contact</p>
			<ul className="list-group list-group-flush" >
				<li className="list-group-item">
				Email: &nbsp;
				{data.header.email.map((x, i) => <span key={i} className="fst-italic fw-bold">{x} </span>)}
				</li>
				<li className="list-group-item">
				Phone: &nbsp;
				{us ? 
				<span  className="fst-italic fw-bold">{data.header.phone[1]} </span>
				:
				<span  className="fst-italic fw-bold">{data.header.phone[0]} </span>
				}
				</li>
				<li className="list-group-item">
				Skype: &nbsp; <span className="fst-italic fw-bold">{data.header.skype}</span>
				</li>
				<li className="list-group-item">
				Address: &nbsp;
				{us ? 
				data.header.address2.map((x, i) => <span key={i}  className="fst-italic fw-bold">{x} </span>)
				:
				data.header.address.map((x, i) => <span key={i}  className="fst-italic fw-bold">{x} </span>)
				}
				</li>
				<li className="list-group-item">
				Website: &nbsp;
				<a className="fst-italic fw-bold text-decoration-none" href={data.header.website}>{data.header.website}</a>
				</li>
			</ul>
		</div>

	)
}



const HeaderMain = ({data, screen}) => {

	return(
		<div className={(data.pdf ? "":"container")  + " h-100"}>
			<div className="row h-100 d-flex align-items-end pb-3">
				<div className="col-12 col-sm-12 col-md-4">

				</div>
				<div className="col-12 col-sm-12 col-md-8 lh-1 ">
					<p className={(screen.w > 767 ? "text-white":"text-dark")+" h1 "}>{data.header.name}</p>
					<p className={(screen.w > 767 ? "text-white":"text-dark")+" fs-5 m-1"}>{data.header.position}</p>
					<p className={(screen.w > 767 ? "text-white":"text-dark")+" fst-italic fw-bold m-1"}>{data.header.degree}</p>
				</div>
			</div>
		</div>
	)
}

const HeaderAbout = ({data,screen}) => {
	return(
		<div className={(data.pdf ? "":"container" ) + " h-100"}>
			<div className="row h-100 my-2">
				<div className="col-12 col-sm-12 col-md-4 ">

				</div>
				<div className="col-12 col-sm-12 col-md-8" style={{maxWidth: 700}}>
					<p className="text-dark h4  ">About</p>
					<p className={"text-dark  m-0 fst-italic "+(screen.w >991 ? "": screen.w > 767 ? "lh-1" :"")}>{data.header.about}</p>
					
				</div>
			</div>
		</div>
	)
}

const Header = ({data, screen}) => {

	return data ?  (
		<div className="mb-3">
			<div className="  position-relative" style={{minHeight: screen.w < 768 ? 250 : 300}}>
				<div className="position-absolute top-0 start-0 bg-secondary w-100 h-50" >
					{screen.w > 767 && <HeaderMain data={data} screen={screen}/>}
				</div>
				
				<div className="position-absolute bottom-0 start-0  w-100 h-50">
					{screen.w > 767 && <HeaderAbout data={data} screen={screen} /> }
				</div>
				<div className="position-absolute top-50 start-0 translate-middle-y w-100 ">
					<div className={data.pdf ? "":"container"}>
						<div className="row h-100 justify-content-center">
							<div className="col-12 col-sm-12 col-md-4 d-flex justify-content-center">
								<img src={ data.header.image} className=" border border-secondary border-5" style={{width: 200, height: 200}}/>
							</div>
							<div className="col-12 col-sm-12 col-md-8 ">
							</div>
						</div>
					</div>
				</div>
			</div>
			
		</div>
	) : <></>

}




const App = () => {

	
	const {data, screen, us } = useContext(Context)
	let [main, setMain] = useState(0)

	useEffect(() => {
		if(data) {
			setMain(document.getElementById("main").clientHeight)
		}
	}, [data, screen])

	// useEffect(() => {
	// 	console.log(main)
	// }, [main])

	return data  ? (
		<>
			<div className="" id="main">
				<div className="border-bottom mb-3">
					<Header data={data} screen={screen}/>
					{screen.w < 768 &&
					
					<div className=" px-3 pb-3 text-center ">
						<HeaderMain data={data} screen={screen}/>
						<HeaderAbout data={data } screen={screen}/>
					</div>
					}
				</div>
				<div className={data.pdf ? "container-fluid":"container"} >
				<div className="row px-2">
					<div className="col-12 col-sm-12 col-md-5">
						<Contact data={data} us={us}/>
						<Skills data={data} />
						<Education data={data} />
					</div>
					<div className={"col-12 col-sm-12 col-md-7 "}>
						<Experience data={data} />
					</div>
				</div>	
				</div>

			</div>
			<div className="bg-secondary " style={{height: screen.h - main < 80 ? 80 : screen.h - main}}>
				<div className="">

				</div>
			</div>
		</>
	) : <>loading...</>

}

createRoot(document.getElementById("app")).render(
	<ContextProvider>
		<App />
	</ContextProvider>
	)


