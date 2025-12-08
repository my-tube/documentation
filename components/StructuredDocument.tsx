
type ProseProps = {
  html: string,
}

function StructuredDocument({ html }:ProseProps) {

  return (
    <div dangerouslySetInnerHTML={{ __html: html }} />
  );
}

export default StructuredDocument;
