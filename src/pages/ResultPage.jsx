import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function ResultPage() {
  const { id } = useParams();
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetch(`/api/result/${id}`)
      .then((res) => res.json())
      .then((data) => setResult(data))
      .catch((err) => console.error("결과 불러오기 실패:", err));
  }, [id]);

  if (!result) return <p>결과 불러오는 중...</p>;

  return (
    <div>
      <h1>🔮 공유된 결과</h1>
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
}

export default ResultPage;
