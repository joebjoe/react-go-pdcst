import './index.css';
import { useParams } from 'react-router-dom';

export default function() {
  let { id } = useParams();
  return <h2>Detail: { id }</h2>
}