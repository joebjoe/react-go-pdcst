import './index.css';
import View from '../../components/View'

export default function() {
    return (
        <View 
            class="about"
            title="About the Project"
        >
            <p><span class="section-label">Goal</span> The purpose behind this project was simply to showcase what I could do in Go + React. The plan 
            was never to build anything too elaborate. It just needed to be functional with just enough aestetics.</p>

            <p><span class="section-label">Golang</span> I have a fair amount of experience programming in Go, however coming from an enterprise
            shop we have teams dedicated to devloping tools that generate much of the boilerplate code for our micro-services. My goal in 
            implementing the server handlers for this project was to <strong><em>not</em></strong> reinvent the wheel, but in essence come up with an
            MVP that was easily repeatable and well-organized. This could definitely be optimized by replacing with something like an rpc
            framework.</p>

            <p><span class="section-label">React</span> Full disclosure - I've never worked in React before. This was very much a learning
            experience. I'm much more comfortable working in Vue, but I enjoyed the challenge. I found it to be very powerful, and flexible
            in a lot of ways, but I definitely felt that a drawback to that was that pretty much everything needed to be home-baked. Coming
            from Vue & the Vuetify library, I definitely felt there was much more grunt work upfront needed to get a functional app off the
            ground with React.</p>
        </View>
    )
}