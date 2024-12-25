import React from 'react'

const Page = () => {
  interface FormElements extends HTMLFormControlsCollection {
    text: HTMLTextAreaElement;
  }

  interface FormElement extends HTMLFormElement {
    elements: FormElements;
  }

  const handleSubmit = (e: React.FormEvent<FormElement>) => {
    e.preventDefault();
    const text = e.currentTarget.elements.text.value;
    console.log(text); // 입력된 텍스트를 콘솔에 출력
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea name='text'></textarea>
      <button type="submit">제출</button>
    </form>
  )
}

export default Page;