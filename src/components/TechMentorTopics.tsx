import { FC } from "react";

// TODO: Add background images
const colors = [
  "#EDE8FF",
  "#FFF8D7",
  "#E0F0FF",
  "#DFF9DC",
  "#FFE9FA",
  "#E0E5FF",
  "#DDF9FF",
  "#F1F1F1",
  "#FFEBDC",
];

const patterns = [
  <svg
    width="410"
    height="146"
    viewBox="0 0 410 146"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="absolute right-0 bottom-0"
  >
    <g opacity="0.1" clip-path="url(#clip0_351_4146)">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M197 102C199.761 102 202 99.7614 202 97C202 94.2386 199.761 92 197 92C194.239 92 192 94.2386 192 97C192 99.7614 194.239 102 197 102ZM229 97C229 99.7614 226.761 102 224 102C221.239 102 219 99.7614 219 97C219 94.2386 221.239 92 224 92C226.761 92 229 94.2386 229 97ZM229 125C229 127.761 226.761 130 224 130C221.239 130 219 127.761 219 125C219 122.239 221.239 120 224 120C226.761 120 229 122.239 229 125ZM224 158C226.761 158 229 155.761 229 153C229 150.239 226.761 148 224 148C221.239 148 219 150.239 219 153C219 155.761 221.239 158 224 158ZM229 181C229 183.761 226.761 186 224 186C221.239 186 219 183.761 219 181C219 178.239 221.239 176 224 176C226.761 176 229 178.239 229 181ZM224 214C226.761 214 229 211.761 229 209C229 206.239 226.761 204 224 204C221.239 204 219 206.239 219 209C219 211.761 221.239 214 224 214ZM256 97C256 99.7614 253.761 102 251 102C248.239 102 246 99.7614 246 97C246 94.2386 248.239 92 251 92C253.761 92 256 94.2386 256 97ZM251 130C253.761 130 256 127.761 256 125C256 122.239 253.761 120 251 120C248.239 120 246 122.239 246 125C246 127.761 248.239 130 251 130ZM256 153C256 155.761 253.761 158 251 158C248.239 158 246 155.761 246 153C246 150.239 248.239 148 251 148C253.761 148 256 150.239 256 153ZM251 186C253.761 186 256 183.761 256 181C256 178.239 253.761 176 251 176C248.239 176 246 178.239 246 181C246 183.761 248.239 186 251 186ZM256 209C256 211.761 253.761 214 251 214C248.239 214 246 211.761 246 209C246 206.239 248.239 204 251 204C253.761 204 256 206.239 256 209ZM278 102C280.761 102 283 99.7614 283 97C283 94.2386 280.761 92 278 92C275.239 92 273 94.2386 273 97C273 99.7614 275.239 102 278 102ZM283 125C283 127.761 280.761 130 278 130C275.239 130 273 127.761 273 125C273 122.239 275.239 120 278 120C280.761 120 283 122.239 283 125ZM278 158C280.761 158 283 155.761 283 153C283 150.239 280.761 148 278 148C275.239 148 273 150.239 273 153C273 155.761 275.239 158 278 158ZM283 181C283 183.761 280.761 186 278 186C275.239 186 273 183.761 273 181C273 178.239 275.239 176 278 176C280.761 176 283 178.239 283 181ZM278 214C280.761 214 283 211.761 283 209C283 206.239 280.761 204 278 204C275.239 204 273 206.239 273 209C273 211.761 275.239 214 278 214ZM310 97C310 99.7614 307.761 102 305 102C302.239 102 300 99.7614 300 97C300 94.2386 302.239 92 305 92C307.761 92 310 94.2386 310 97ZM305 130C307.761 130 310 127.761 310 125C310 122.239 307.761 120 305 120C302.239 120 300 122.239 300 125C300 127.761 302.239 130 305 130ZM310 153C310 155.761 307.761 158 305 158C302.239 158 300 155.761 300 153C300 150.239 302.239 148 305 148C307.761 148 310 150.239 310 153ZM305 186C307.761 186 310 183.761 310 181C310 178.239 307.761 176 305 176C302.239 176 300 178.239 300 181C300 183.761 302.239 186 305 186ZM310 209C310 211.761 307.761 214 305 214C302.239 214 300 211.761 300 209C300 206.239 302.239 204 305 204C307.761 204 310 206.239 310 209ZM202 125C202 127.761 199.761 130 197 130C194.239 130 192 127.761 192 125C192 122.239 194.239 120 197 120C199.761 120 202 122.239 202 125ZM197 158C199.761 158 202 155.761 202 153C202 150.239 199.761 148 197 148C194.239 148 192 150.239 192 153C192 155.761 194.239 158 197 158ZM202 181C202 183.761 199.761 186 197 186C194.239 186 192 183.761 192 181C192 178.239 194.239 176 197 176C199.761 176 202 178.239 202 181ZM197 214C199.761 214 202 211.761 202 209C202 206.239 199.761 204 197 204C194.239 204 192 206.239 192 209C192 211.761 194.239 214 197 214Z"
        fill="black"
      />
    </g>
    <defs>
      <clipPath id="clip0_351_4146">
        <rect width="410" height="146" fill="white" />
      </clipPath>
    </defs>
  </svg>,
  <svg
    width="410"
    height="146"
    viewBox="0 0 410 146"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="absolute right-0 bottom-0"
  >
    <g opacity="0.1" clip-path="url(#clip0_680_2191)">
      <path
        opacity="0.5"
        d="M275.111 87.4613L309.553 64.8183L295.718 99.3376L293.475 104.931L299.501 104.825L341.204 104.089L307.492 124.433L301.817 127.858L307.492 131.283L341.204 151.627L299.501 150.891L293.475 150.785L295.718 156.378L309.553 190.898L275.111 168.255L270.826 165.438L269.137 170.279L256.525 206.426L243.914 170.279L242.225 165.438L237.94 168.255L203.498 190.898L217.333 156.378L219.575 150.785L213.55 150.891L171.847 151.627L205.559 131.283L211.234 127.858L205.559 124.433L171.847 104.089L213.55 104.825L219.575 104.931L217.333 99.3376L203.498 64.8183L237.94 87.4613L242.225 90.2783L243.914 85.4366L256.525 49.2903L269.137 85.4366L270.826 90.2783L275.111 87.4613Z"
        stroke="#282828"
        stroke-width="8"
      />
    </g>
    <defs>
      <clipPath id="clip0_680_2191">
        <rect width="410" height="146" fill="white" />
      </clipPath>
    </defs>
  </svg>,
  <svg
    width="410"
    height="146"
    viewBox="0 0 410 146"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="absolute right-0 bottom-0"
  >
    <g opacity="0.1" clip-path="url(#clip0_680_894)">
      <path
        opacity="0.5"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M344 138C344 182.735 307.735 219 263 219C218.265 219 182 182.735 182 138C182 93.2649 218.265 57 263 57C307.735 57 344 93.2649 344 138ZM352 138C352 187.153 312.153 227 263 227C213.847 227 174 187.153 174 138C174 88.8467 213.847 49 263 49C312.153 49 352 88.8467 352 138ZM263 190C291.719 190 315 166.719 315 138C315 109.281 291.719 86 263 86C234.281 86 211 109.281 211 138C211 166.719 234.281 190 263 190ZM263 198C296.137 198 323 171.137 323 138C323 104.863 296.137 78 263 78C229.863 78 203 104.863 203 138C203 171.137 229.863 198 263 198ZM263 160C275.15 160 285 150.15 285 138C285 125.85 275.15 116 263 116C250.85 116 241 125.85 241 138C241 150.15 250.85 160 263 160ZM263 168C279.569 168 293 154.569 293 138C293 121.431 279.569 108 263 108C246.431 108 233 121.431 233 138C233 154.569 246.431 168 263 168Z"
        fill="#282828"
      />
    </g>
    <defs>
      <clipPath id="clip0_680_894">
        <rect width="410" height="146" fill="white" />
      </clipPath>
    </defs>
  </svg>,
  <svg
    width="410"
    height="146"
    viewBox="0 0 410 146"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="absolute right-0 bottom-0"
  >
    <g opacity="0.1" clip-path="url(#clip0_680_1911)">
      <path
        opacity="0.5"
        d="M152 158L202.313 96.2483L230.98 142.79L268.422 71L320.49 158L343.306 85.9056L410 126.364"
        stroke="black"
        stroke-width="8"
      />
    </g>
    <defs>
      <clipPath id="clip0_680_1911">
        <rect width="410" height="146" fill="white" />
      </clipPath>
    </defs>
  </svg>,
  <svg
    width="410"
    height="146"
    viewBox="0 0 410 146"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="absolute right-0 bottom-0"
  >
    <g opacity="0.1">
      <path
        opacity="0.5"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M351 38H194V48H351V38ZM351 68H194V78H351V68ZM194 98H351V108H194V98ZM351 128H194V138H351V128Z"
        fill="black"
      />
    </g>
  </svg>,
  <svg
    width="410"
    height="146"
    viewBox="0 0 410 146"
    fill="none"
    className="absolute right-0 bottom-0"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g opacity="0.1" clip-path="url(#clip0_680_2758)">
      <path
        opacity="0.5"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M214 149L214 57H205L205 149H214ZM240 57L240 104H231L231 57H240ZM265 135.269L265 57H256L256 135.269H265ZM291 57V127.03H281L281 57H291ZM316 102V57H307V102H316ZM342 127.03V57H333V127.03H342Z"
        fill="black"
      />
    </g>
    <defs>
      <clipPath id="clip0_680_2758">
        <rect width="410" height="146" fill="white" />
      </clipPath>
    </defs>
  </svg>,
  <svg
    width="410"
    height="146"
    viewBox="0 0 410 146"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="absolute right-0 bottom-0"
  >
    <g opacity="0.1">
      <path
        d="M297.002 69.967L294.653 69.4916L293.964 67.1968C291.474 58.9027 286.521 52.1846 278.938 46.9686C271.339 41.7421 262.736 39.114 253 39.114C240.981 39.114 230.98 42.87 222.751 50.3175C214.538 57.7506 210.545 66.6239 210.545 77.1583V80.7605L206.963 81.1364C200.194 81.8467 194.747 84.4446 190.411 88.8868C186.073 93.3308 184 98.3725 184 104.187C184 110.51 186.384 115.832 191.394 120.366C196.419 124.914 202.496 127.215 209.864 127.215H289.5C298.65 127.215 306.291 124.38 312.65 118.758C318.969 113.172 322 106.536 322 98.6309C322 91.8006 319.757 85.7561 315.156 80.3518C310.581 74.9767 304.595 71.5042 297.002 69.967Z"
        stroke="black"
        stroke-opacity="0.5"
        stroke-width="8"
      />
    </g>
  </svg>,
  <svg
    width="410"
    height="146"
    viewBox="0 0 410 146"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="absolute right-0 bottom-0"
  >
    <g opacity="0.1">
      <circle
        cx="232.711"
        cy="33.774"
        r="8.77404"
        stroke="black"
        stroke-opacity="0.5"
        stroke-width="8"
      />
      <circle
        cx="232.711"
        cy="126.504"
        r="8.77404"
        stroke="black"
        stroke-opacity="0.5"
        stroke-width="8"
      />
      <circle
        cx="329.225"
        cy="33.774"
        r="8.77404"
        stroke="black"
        stroke-opacity="0.5"
        stroke-width="8"
      />
      <circle
        cx="329.225"
        cy="126.504"
        r="8.77404"
        stroke="black"
        stroke-opacity="0.5"
        stroke-width="8"
      />
      <path
        d="M233.656 40.8707V117.042"
        stroke="black"
        stroke-opacity="0.5"
        stroke-width="8"
      />
      <path
        d="M329.698 40.8707V117.042"
        stroke="black"
        stroke-opacity="0.5"
        stroke-width="8"
      />
      <path
        d="M242.646 126.031L318.817 126.031"
        stroke="black"
        stroke-opacity="0.5"
        stroke-width="8"
      />
      <path
        d="M242.646 33.3009L318.817 33.3009"
        stroke="black"
        stroke-opacity="0.5"
        stroke-width="8"
      />
    </g>
  </svg>,
  <svg
    width="410"
    height="146"
    viewBox="0 0 410 146"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="absolute right-0 bottom-0"
  >
    <g opacity="0.1">
      <rect
        x="247"
        y="29"
        width="107"
        height="107"
        rx="14"
        stroke="black"
        stroke-opacity="0.5"
        stroke-width="8"
      />
    </g>
  </svg>,
];

export const TechMentorTopics: FC<{ tech_mentor_topics: any }> = ({
  tech_mentor_topics,
}) => {
  return (
    <div className="max-w-2xl lg:max-w-7xl mx-auto w-full px-4 py-20">
      <h2 className="max-w-2xl mx-auto w-full text-center font-bold-x text-3xl lg:text-4xl">
        {tech_mentor_topics.title}
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-3 lg:gap-x-8 gap-y-7 lg:gap-y-10 mt-16">
        {tech_mentor_topics.topics.map((topic, index) => (
          <div
            style={{ backgroundColor: colors[index] }}
            className="flex flex-col-reverse justify-between lg:flex-row gap-8 p-3 lg:pt-9 lg:px-7 lg:pb-6 rounded-lg relative"
          >
            {patterns[index]}
            <p className="font-bold-x text-lg lg:text-2xl relative">
              {topic.topic}
            </p>
            <img
              src={topic.image.sizes.medium}
              className="w-[61px] h-[78px] lg:w-[107px] lg:h-[136px] object-cover -mt-5 lg:-mt-12 rounded-sm place-self-end lg:place-self-auto relative"
              alt=""
            />
          </div>
        ))}
      </div>
    </div>
  );
};
